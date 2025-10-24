import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid'; // Плагин для вида "сетка"
import interactionPlugin from '@fullcalendar/interaction'; // Плагин для интерактивности
import { AppDispatch, RootState } from '@/app/providers/store/types';
import { useDispatch, useSelector } from 'react-redux';
import { tasksSelectors } from '@/entities/Task/model/tasksSlice';
import { useEffect, useMemo } from 'react';
import { fetchTasks } from '@/entities/Task/model/fetchTasks';
import { EventDropArg } from '@fullcalendar/core'; // 3. Импортируем тип для аргумента обработчика
import { updateTaskApi } from '@/features/EditTask/api/updateTaskApi';

export const CalendarPage = () => {
    const dispatch: AppDispatch = useDispatch()

    const allTasks = useSelector(tasksSelectors.selectAll)
    const tasksLoadingStatus = useSelector((state: RootState) => state.tasks.loading)

    useEffect(() => {
        if (tasksLoadingStatus === 'idle') {
            dispatch(fetchTasks())
        }
    }, [dispatch, tasksLoadingStatus])

    const calendarEvenst = useMemo(() => {
        return allTasks
            .filter(task => !!task.startDate)
            .map(task => ({
                id: task.id,
                title: task.title,
                start: task.startDate,
                end: task.endDate,
                // extendedProps - это "мешок" для любых наших данных.
                // Мы сохраняем сюда всю оригинальную задачу, это понадобится нам в будущем.
                extendsProps: {
                    task
                }
            }))
    }, [allTasks]) // Этот код будет выполняться только тогда, когда изменится allTasks

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

    return (
        <div>
            <h1>Calendar page</h1>
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView='dayGridMonth'
                weekends={true}
                events={calendarEvenst}

                editable={true}

                eventDrop={handleEventDrop}
            />
        </div>
    )
}