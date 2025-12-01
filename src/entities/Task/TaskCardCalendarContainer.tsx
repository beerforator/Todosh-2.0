import React from 'react';

import { EventContentArg } from '@fullcalendar/core';
import { Task } from '@/shared/types/entities';
import { ToggleTaskContainer } from '@/features/ToggleTask/ToggleTaskContainer';
import { TaskText } from './ui/TaskCard';

import styleC from '@/app/styles/MainContentStyles/CalendarPage.module.scss'
import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers/store/types';
import { listsSelectors } from '@/app/providers/store/slices/listsSlice';
import { ListCircleIcon } from '@/shared/ui/ListCircleIcon';

interface TaskCardCalendarContainerProps {
    task: Task,
    selectedListId: string,
    isSettingUpdateDates: boolean
}

export const TaskCardCalendarContainer = React.memo(({ task, selectedListId, isSettingUpdateDates }: TaskCardCalendarContainerProps) => {
    const _selectedList = useSelector((state: RootState) => listsSelectors.selectById(state, selectedListId));

    // Костыль !!! Ресурсозатратный
    const selectedList = useSelector((state: RootState) => listsSelectors.selectById(state, task.listOwnerId));

    if (isSettingUpdateDates) return

    return (
        <div className={styleC.calendarEvent}>
            <ListCircleIcon
                color={selectedList
                    ? selectedList.color
                    : "#000"}
            />

            <ToggleTaskContainer taskId={task.id} size={'small'} />
            <TaskText
                text={task.title}
                isCompleted={task.isCompleted}
                // variant="body2"
                type='title'
            />
        </div>
    )
})