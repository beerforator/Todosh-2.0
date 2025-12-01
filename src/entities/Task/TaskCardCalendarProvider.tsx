import React from 'react';

import { EventContentArg } from '@fullcalendar/core';
import { TaskCardCalendarContainer } from './TaskCardCalendarContainer';

export const TaskCardCalendarProvider = (eventInfo: EventContentArg) => {
    const props = eventInfo.event.extendedProps

    return (
        <TaskCardCalendarContainer
            task={props.task}
            selectedListId={props.selectedListId}
            isSettingUpdateDates={props.isSettingUpdateDates}
        />
    )
}