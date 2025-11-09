import React, { useCallback } from 'react';
import { updateTaskApi } from '../../app/services/taskServices/updateTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { RemoveTaskDate } from '@/shared/ui/TaskManipulationIcons/RemoveTaskDate';

interface RemoveTaskDateContainerProps {
    taskId: string;
}

export const RemoveTaskDateContainer = React.memo(({ taskId }: RemoveTaskDateContainerProps) => {
    const [letRemoveDate, isLettingRemoveDate] = useApiRequest(updateTaskApi, {})

    const handleRemoveDate = useCallback(() => {
        let payload = {
            taskId: taskId,
            changes: { startDate: null, endDate: null }
        }

        letRemoveDate(payload)
    }, [letRemoveDate, taskId])

    return (
        <RemoveTaskDate
            handleRemoveDate={handleRemoveDate}
            isLettingRemoveDate={isLettingRemoveDate}
        />
    );
})