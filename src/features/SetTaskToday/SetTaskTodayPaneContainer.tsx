import React, { useCallback } from 'react';
import { updateTaskApi } from '../../app/services/taskServices/updateTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { SetTaskToday } from '@/shared/ui/TaskManipulationIcons/SetTaskToday';

import styleP from '@/app/styles/TaskDetailsPane.module.scss'
import { ListItemText } from '@mui/material';
import { TodayTaskIcon } from '@/shared/ui/Icons/TaskIcon';

interface SetTaskTodayPaneContainerProps {
    taskId: string;
}

export const SetTaskTodayPaneContainer = React.memo(({ taskId}: SetTaskTodayPaneContainerProps) => {
    const [setTaskOnToday, isSettingTaskOnToday] = useApiRequest(updateTaskApi, {})

    // const isCompleted = useSelector((state: RootState) =>
    //     tasksSelectors.selectById(state, taskId)?.isCompleted
    // );

    const handleSetToday = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();

        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 1)

        let payload = {
            taskId: taskId,
            changes: { startDate: today, endDate }
        }

        setTaskOnToday(payload)
    }, [setTaskOnToday, taskId])

    return (
        <button
            onClick={handleSetToday}
            disabled={isSettingTaskOnToday}
            className={styleP.dateButton}
        >
            <TodayTaskIcon />
            <ListItemText className={styleP.paneText} primary={"Add task for today"} />
        </button>
    );
})