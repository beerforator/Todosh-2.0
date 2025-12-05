import React, { useCallback } from 'react';

import { updateTaskApi } from '../../app/services/taskServices/updateTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { SetTaskToday } from '@/shared/ui/TaskManipulationIcons/SetTaskToday';

interface SetTaskTodayContainerProps {
    taskId: string,
    disabled?: boolean
}

export const SetTaskTodayContainer = React.memo(({ taskId, disabled }: SetTaskTodayContainerProps) => {
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
        <SetTaskToday
            handleSetToday={handleSetToday}
            isSettingTaskOnToday={isSettingTaskOnToday}
            disabled={disabled}
        />
    );
})