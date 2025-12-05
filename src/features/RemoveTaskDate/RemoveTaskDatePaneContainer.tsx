import React, { useCallback } from 'react';
import { updateTaskApi } from '../../app/services/taskServices/updateTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { RemoveTaskDate } from '@/shared/ui/TaskManipulationIcons/RemoveTaskDate';

import styleP from '@/app/styles/TaskDetailsPane.module.scss'
import { DelDateIcon } from '@/shared/ui/Icons/TaskIcon';
import { ListItemText } from '@mui/material';

interface RemoveTaskDatePaneContainerProps {
    taskId: string;
}

export const RemoveTaskDatePaneContainer = React.memo(({ taskId }: RemoveTaskDatePaneContainerProps) => {
    const [letRemoveDate, isLettingRemoveDate] = useApiRequest(updateTaskApi, {})

    const handleRemoveDate = useCallback(() => {
        let payload = {
            taskId: taskId,
            changes: { startDate: null, endDate: null }
        }

        letRemoveDate(payload)
    }, [letRemoveDate, taskId])

    return (
        <button
            onClick={handleRemoveDate}
            disabled={isLettingRemoveDate}
            className={styleP.dateButton}
        >
            <DelDateIcon />
            <ListItemText className={styleP.paneText} primary={"Remove task date"} />
        </button>
    );
})