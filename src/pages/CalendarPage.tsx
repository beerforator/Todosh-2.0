import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // Плагин для вида "сетка"
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction'; // Плагин для интерактивности
import { AppDispatch, RootState } from '@/app/providers/store/types';
import { useDispatch, useSelector } from 'react-redux';
import { tasksSelectors } from '@/entities/Task/model/tasksSlice';
import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchTasks } from '@/entities/Task/model/fetchTasks';
import { DateSelectArg, EventChangeArg, EventClickArg, EventContentArg, EventDropArg } from '@fullcalendar/core'; // 3. Импортируем тип для аргумента обработчика
import { updateTaskApi } from '@/features/EditTask/api/updateTaskApi';
import { createTask } from '@/features/TaskModal/api/useCreateTask';
import { CalendarCreateModal } from '@/features/TaskModal/CalendarCreateModal';
import { Task } from '@/shared/types/entities';
import { startEditingTask } from '@/widgets/UISlice/UISlice';
import { ALL_TASKS_LIST_ID, listsSelectors, TODAY_TASKS_LIST_ID } from '@/entities/List/model/listsSlice';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Typography } from '@mui/material';
import { ToggleTaskCalendar } from '@/features/ToggleTaskCalendar/ToggleTaskCalendar';
import { ToggleFavouritCalendar } from '@/features/ToggleFavouriteCalendar/ToggleFavouriteCalendar';

export const CalendarPage = () => {
    const dispatch: AppDispatch = useDispatch()
    const allLists = useSelector(listsSelectors.selectAll)
    const allTasks = useSelector(tasksSelectors.selectAll)
    const tasksLoadingStatus = useSelector((state: RootState) => state.tasks.loading)
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);

    const calendarRef = useRef<FullCalendar>(null);

    // Управление календарем

    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (!calendarApi) return;

        if (selectedListId === TODAY_TASKS_LIST_ID) {
            calendarApi.gotoDate(new Date());

            // if (calendarApi.view.type !== 'timeGridDay') {
            //     calendarApi.changeView('timeGridDay');
            // }
        } else {
            calendarApi.changeView('dayGridMonth')
        }
    }, [selectedListId]);

    useEffect(() => {
        if (tasksLoadingStatus === 'idle') {
            dispatch(fetchTasks())
        }
    }, [dispatch, tasksLoadingStatus])

    const calendarEvenst = useMemo(() => {
        const filteredTasks = selectedListId === ALL_TASKS_LIST_ID || selectedListId === TODAY_TASKS_LIST_ID
            ? allTasks
            : allTasks.filter(task => task.listOwnerId === selectedListId);

        return filteredTasks
            .filter(task => !!task.startDate)
            .map(task => {

                return {
                    id: task.id,
                    title: task.title,
                    start: task.startDate ?? undefined,
                    end: task.endDate ?? undefined,
                    backgroundColor: allTasks.find(t => t.id === task.id)?.listOwnerId
                        ? allLists.find(l => l.id === task.listOwnerId)?.color
                        : '#808080',
                    borderColor: allTasks.find(t => t.id === task.id)?.listOwnerId
                        ? allLists.find(l => l.id === task.listOwnerId)?.color
                        : '#808080',
                    // extendedProps - это "мешок" для любых наших данных.
                    // Мы сохраняем сюда всю оригинальную задачу, это понадобится нам в будущем.
                    extendedProps: {
                        task
                    },
                    allDay: true
                }
            })
    }, [allTasks, selectedListId, allLists]) // Этот код будет выполняться только тогда, когда изменится allTasks

    const handleEventDrop = async (dropInfo: EventDropArg) => {
        const { event } = dropInfo
        const changes = {
            startDate: event.start ?? undefined,
            endDate: event.end ?? undefined
        }

        try {
            await dispatch(updateTaskApi({
                taskId: event.id,
                changes: changes
            })).unwrap()
        } catch (error) {
            console.error('Failed to update task date:', error);
        }
    }

    // Создание задач

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [taskTitle, setTaskTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleDateClick = (clickInfo: DateClickArg) => {
        setSelectedDate(clickInfo.date);
        setTaskTitle(''); // Сбрасываем заголовок
        setIsModalOpen(true); // Открываем
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        // Сбрасываем все состояния при закрытии
        setSelectedDate(null);
        setTaskTitle('');
    };

    const handleSubmit = async () => {
        if (!taskTitle.trim() || !selectedDate) return;

        setIsLoading(true);
        try {
            let listOwnerId = selectedListId === 'all' ? '' : selectedListId
            await dispatch(createTask({
                title: taskTitle,
                listOwnerId: listOwnerId,
                startDate: selectedDate,
                endDate: selectedDate
            })).unwrap();
            handleCloseModal(); // Закрываем после успеха
        } catch (error) {
            console.error('Failed to create task:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Изменение задач

    const handleEditingTask = (clickInfo: EventClickArg) => {
        const taskId = clickInfo.event.id;
        dispatch(startEditingTask({
            taskId: taskId,
            mode: 'temporary'
        }))
    }

    // Растягивание задачи

    const handleEventResize = async (resizeInfo: EventResizeDoneArg) => {
        const { event } = resizeInfo
        const changes = {
            startDate: event.start,
            endDate: event.end
        }

        try {
            await dispatch(updateTaskApi({
                taskId: event.id,
                changes,
            })).unwrap();
        } catch (error) {
            console.error('Failed to update task end date:', error);
            // Если произойдет ошибка, `FullCalendar` сам вернет событие к прежнему размеру.
            // Это встроенная "пессимистичная" логика.
            resizeInfo.revert();
        }
    }

    // Рендер эвента

    const renderEventContent = (eventInfo: EventContentArg) => {
        // debugger
        const task: Task = eventInfo.event.extendedProps.task

        return (
            <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden', width: '100%' }}>
                <ToggleTaskCalendar task={task} />
                <Typography
                    variant="body2"
                    sx={{
                        ml: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textDecoration: task.isCompleted ? 'line-through' : 'none',
                        opacity: task.isCompleted ? 0.6 : 1,
                        flexGrow: 1
                    }}
                >
                    {eventInfo.event.title}
                </Typography>
                <ToggleFavouritCalendar task={task} />
            </Box>
        )
    }

    return (
        <div>
            <h1>Calendar page</h1>
            <FullCalendar
                // Визуал
                headerToolbar={{
                    start: "today prev next",
                    end: "dayGridMonth dayGridWeek",
                }}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                firstDay={1}
                // eventDisplay="block"

                // Флаги для управления
                editable={true}
                weekends={true}
                events={calendarEvenst}
                eventResizableFromStart={true}
                // eventDurationEditable={true}

                // Калбэки
                eventDrop={handleEventDrop}
                dateClick={handleDateClick}
                eventClick={handleEditingTask}
                eventResize={handleEventResize}

                // Кастомный контент
                ref={calendarRef}
                eventContent={renderEventContent}
            />
            {isModalOpen && (
                <CalendarCreateModal
                    isOpen={isModalOpen}
                    // isEditMode больше не нужен
                    title={taskTitle}
                    onTitleChange={setTaskTitle}
                    onSubmit={handleSubmit}
                    onClose={handleCloseModal}
                    isLoading={isLoading}
                />
            )}
        </div>
    )
}