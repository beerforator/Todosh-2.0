import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // Плагин для вида "сетка"
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'; // Плагин для интерактивности
import { AppDispatch, RootState } from '@/app/providers/store/types';
import { useDispatch, useSelector } from 'react-redux';
import { tasksSelectors } from '@/entities/Task/model/tasksSlice';
import { useEffect, useMemo, useState } from 'react';
import { fetchTasks } from '@/entities/Task/model/fetchTasks';
import { EventClickArg, EventDropArg } from '@fullcalendar/core'; // 3. Импортируем тип для аргумента обработчика
import { updateTaskApi } from '@/features/EditTask/api/updateTaskApi';
import { createTask } from '@/features/TaskModal/api/useCreateTask';
import { CalendarCreateModal } from '@/features/TaskModal/CalendarCreateModal';
import { Task } from '@/shared/types/entities';
import { startEditingTask } from '@/widgets/UISlice/UISlice';
import { ALL_TASKS_LIST_ID, listsSelectors } from '@/entities/List/model/listsSlice';

export const CalendarPage = () => {
    const dispatch: AppDispatch = useDispatch()
    const allLists = useSelector(listsSelectors.selectAll)
    const allTasks = useSelector(tasksSelectors.selectAll)
    const tasksLoadingStatus = useSelector((state: RootState) => state.tasks.loading)
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);


    // Управление календарем

    useEffect(() => {
        if (tasksLoadingStatus === 'idle') {
            dispatch(fetchTasks())
        }
    }, [dispatch, tasksLoadingStatus])

    const calendarEvenst = useMemo(() => {
        const filteredTasks = selectedListId === ALL_TASKS_LIST_ID
            ? allTasks
            : allTasks.filter(task => task.listOwnerId === selectedListId);

        return filteredTasks
            .filter(task => !!task.startDate)
            .map(task => ({
                id: task.id,
                title: task.title,
                start: task.startDate,
                end: task.endDate,
                backgroundColor: allTasks.find(t => t.id === task.id)?.listOwnerId
                    ? allLists.find(l => l.id === task.listOwnerId)?.color
                    : '#808080',
                borderColor: allTasks.find(t => t.id === task.id)?.listOwnerId
                    ? allLists.find(l => l.id === task.listOwnerId)?.color
                    : '#808080',
                // extendedProps - это "мешок" для любых наших данных.
                // Мы сохраняем сюда всю оригинальную задачу, это понадобится нам в будущем.
                extendsProps: {
                    task
                }
            }))
    }, [allTasks, selectedListId]) // Этот код будет выполняться только тогда, когда изменится allTasks

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
            let listOwnerId = selectedListId === 'all' ? '': selectedListId
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

    return (
        <div>
            <h1>Calendar page</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                weekends={true}
                events={calendarEvenst}
                editable={true}
                firstDay={1}
                eventDisplay="block"

                eventDrop={handleEventDrop}
                dateClick={handleDateClick}
                eventClick={handleEditingTask}
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