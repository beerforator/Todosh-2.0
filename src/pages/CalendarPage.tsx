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
import { Box, ListItemIcon, Typography } from '@mui/material';
import { tasksSelectors } from '@/app/providers/store/slices/tasksSlice';
import { ToggleFavourite, ToggleFavouriteContainer } from '@/features/ToggleFavourite/ToggleFavouriteContainer';
import { ToggleTask, ToggleTaskContainer } from '@/features/ToggleTask/ToggleTaskContainer';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { TaskText } from '@/entities/Task/ui/TaskCard';

import style from '@/app/styles/IconStyles.module.scss'
import styleT from '@/app/styles/MainContentStyles/TasksPage.module.scss'
import styleC from '@/app/styles/MainContentStyles/CalendarPage.module.scss'
import styleMC from '@/app/styles/MainContentStyles/MainContent.module.scss'

import { AllTasksIcon } from '@/shared/ui/Icons/SidebarIcons';
import { TaskCardCalendarProvider } from '@/entities/Task/TaskCardCalendarProvider';

export const CalendarPage = () => {
    // console.log('CalendarPage')

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
                    // backgroundColor: allTasks.find(t => t.id === task.id)?.listOwnerId
                    //     ? allLists.find(l => l.id === task.listOwnerId)?.color
                    //     : '#808080',
                    // borderColor: allTasks.find(t => t.id === task.id)?.listOwnerId
                    //     ? allLists.find(l => l.id === task.listOwnerId)?.color
                    //     : '#000000',
                    extendedProps: {
                        task,
                        selectedListId,
                        isSettingUpdateDates
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

//    const selectedList = useSelector((state: RootState) =>
//         selectedListId ? listsSelectors.selectById(state, selectedListId) : undefined
//     );

    const renderEventContent = (eventInfo: EventContentArg) => {
        const task: Task = eventInfo.event.extendedProps.task

        if (isSettingUpdateDates) return

        // const color = allTasks.find(t => t.id === task.id)?.listOwnerId
        //     ? allLists.find(l => l.id === task.listOwnerId)?.color
        //     : '#000000',

        return (
            <div className={styleC.calendarEvent}>
                {/* <Box
                    component="span"
                    sx={{
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: taskcolor,
                        mr: 1, // Отступ справа
                        flexShrink: 0, // Запрещаем сжиматься
                    }}
                /> */}

                <ToggleTaskContainer taskId={task.id} size={'small'} />
                <TaskText
                    text={task.title}
                    isCompleted={task.isCompleted}
                    // variant="body2"
                    type='title'
                />
            </div>
        )
    }

    // alert()

    /* ПРАВКИ
    
    Сделаны общие стили - вынес что-то в AppRouter, что-то в родительские компоненты. 
    
    Приведены в порядок перерисовки и спагетти на уровне больших компонент - делигировал прерисовку ScrollableView (убал хук из TasksPage.).

    Обернул календарь в общий контейнер и остановился на добавлении глобальных переменных стилей в MainContent.module - нужно сделать 
    внешний вид календаря поприятнее, переопределить сильнее его базовые стили.
    
    ВАЖНО! Календарь не растягивается при сворачивании сайдбара

    ВАЖНО!! При перемещении и растягивании задачи они не отрисовываются

    */

    return (
        <>
            <div className={styleMC.listHeader}>
                <ListItemIcon>
                    <AllTasksIcon className={style.filterIconStyle + ' ' + style.allIconStyle} />
                </ListItemIcon>
                <Typography variant="h4" gutterBottom>Calendar page</Typography>
            </ div>
            <div className={styleMC.scrollableView + ' ' + styleMC.scrollableView_calendar}>
                <FullCalendar
                    // Визуал
                    headerToolbar={{
                        start: "today prev next",
                        end: "dayGridMonth dayGridWeek",
                    }}
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView='dayGridMonth'
                    firstDay={1}
                    height="85vh"
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
                    eventContent={TaskCardCalendarProvider}
                />
                {isModalOpen && (
                    <CalendarCreateModal
                        onClose={handleCloseModal}
                        selectedDate={selectedDate}
                    />
                )}
            </div>
        </>
    )
}