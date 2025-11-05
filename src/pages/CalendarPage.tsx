import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // Плагин для вида "сетка"
import interactionPlugin, { DateClickArg, EventResizeDoneArg } from '@fullcalendar/interaction'; // Плагин для интерактивности
import { AppDispatch, RootState } from '@/app/providers/store/types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';
import { fetchTasksApi } from '@/app/services/taskServices/fetchTasksApi';
import { EventClickArg, EventContentArg, EventDropArg } from '@fullcalendar/core'; // 3. Импортируем тип для аргумента обработчика
import { updateTaskApi } from '@/app/services/taskServices/updateTaskApi';
import { CalendarCreateModal } from '@/features/CreateTask/TaskModal/CalendarCreateModal';
import { Task } from '@/shared/types/entities';
import { startEditingTask } from '@/app/services/UISlice/UISlice';
import { ALL_TASKS_LIST_ID, listsSelectors, TODAY_TASKS_LIST_ID } from '@/app/providers/store/slices/listsSlice';
import timeGridPlugin from '@fullcalendar/timegrid';
import { Box, Typography } from '@mui/material';
import { tasksSelectors } from '@/app/providers/store/slices/tasksSlice';
import { ToggleFavourite } from '@/features/ToggleFavourite/ToggleFavourite';
import { ToggleTask } from '@/features/ToggleTask/ToggleTask';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

export const CalendarPage = () => {
    const dispatch: AppDispatch = useDispatch()
    const allLists = useSelector(listsSelectors.selectAll)
    const allTasks = useSelector(tasksSelectors.selectAll)
    const tasksLoadingStatus = useSelector((state: RootState) => state.tasks.loading)
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);

    const calendarRef = useRef<FullCalendar>(null);

    const [setFetchTasks, isSettingFetchTasks] = useApiRequest(fetchTasksApi, {})
    const [setUpdateDates, isSettingUpdateDates] = useApiRequest(updateTaskApi, {})

    // Управление календарем

    useEffect(() => {
        const calendarApi = calendarRef.current?.getApi();
        if (!calendarApi) return;

        if (selectedListId === TODAY_TASKS_LIST_ID) {
            calendarApi.gotoDate(new Date());
        } else {
            calendarApi.changeView('dayGridMonth')
        }
    }, [selectedListId]);

    useEffect(() => {
        if (tasksLoadingStatus === 'idle') {
            setFetchTasks({})
        }
    }, [setFetchTasks, tasksLoadingStatus])

    const calendarEvents = useMemo(() => {
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
                    extendedProps: {
                        task
                    },
                    allDay: true
                }
            })
    }, [allTasks, selectedListId, allLists])

    const handleEventDrop = (dropInfo: EventDropArg) => {
        const { event } = dropInfo

        const payload = {
            taskId: event.id,
            changes: {
                startDate: event.start ?? undefined,
                endDate: event.end ?? undefined
            }
        }

        setUpdateDates(payload)
    }

    // Создание задач

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const handleDateClick = (clickInfo: DateClickArg) => {
        setSelectedDate(clickInfo.date);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDate(null);
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

    const handleEventResize = (resizeInfo: EventResizeDoneArg) => {
        const { event } = resizeInfo

        const payload = {
            taskId: event.id,
            changes: {
                startDate: event.start,
                endDate: event.end
            }
        }

        setUpdateDates(payload)
    }

    // Рендер эвента

    const renderEventContent = (eventInfo: EventContentArg) => {
        const task: Task = eventInfo.event.extendedProps.task

        if (isSettingUpdateDates) return

        return (
            <Box sx={{ display: 'flex', alignItems: 'center', overflow: 'hidden', width: '100%' }}>
                <ToggleTask task={task} size={'small'} />
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
                <ToggleFavourite task={task} size={'small'} />
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
                events={calendarEvents}
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
                    onClose={handleCloseModal}
                    selectedDate={selectedDate}
                />
            )}
        </div>
    )
}