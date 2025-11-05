// src/features/RemoveTaskDate/RemoveTaskDate.tsx
import React from 'react';
import { Task } from '@/shared/types/entities';
import { IconButton } from '@mui/material';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { updateTaskApi } from '../../app/services/taskServices/updateTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

interface RemoveTaskDateProps {
    task: Task;
}

export const RemoveTaskDate = ({ task }: RemoveTaskDateProps) => {
    const [letRemoveDate, isLettingRemoveDate] = useApiRequest(updateTaskApi, {})

    const handleRemoveDate = () => {
        let payload = {
            taskId: task.id,
            changes: { startDate: null, endDate: null }
        }

        letRemoveDate(payload)
    }

    return (
        <IconButton
            onClick={handleRemoveDate}
            disabled={false}
        >
            <EventBusyIcon color="secondary" />
        </IconButton>
    );
};