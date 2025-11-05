import React from 'react';
import { Task } from '@/shared/types/entities';
import { IconButton } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import { updateTaskApi } from '../../app/services/taskServices/updateTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

interface SetTaskTodayProps {
    task: Task;
}

export const SetTaskToday = ({ task }: SetTaskTodayProps) => {
    const [setTaskOnToday, isSettingTaskOnToday] = useApiRequest(updateTaskApi, {})

    const handleSetToday = (e: React.MouseEvent) => {
        e.stopPropagation();

        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 1)

        let payload = {
            taskId: task.id,
            changes: { startDate: today, endDate }
        }

        setTaskOnToday(payload)
    }

    return (
        <IconButton
            onClick={handleSetToday}
            disabled={false}
        >
            <TodayIcon color="primary" />
        </IconButton>
    );
};