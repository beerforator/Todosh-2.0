// src/features/RemoveTaskDate/RemoveTaskDate.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/store/types';
import { Task } from '@/shared/types/entities';
import { Button, IconButton } from '@mui/material';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import { updateTaskApi } from '../EditTask/api/updateTaskApi';

interface RemoveTaskDateProps {
    task: Task;
}

export const RemoveTaskDate = ({ task }: RemoveTaskDateProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleRemoveDate = async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (isLoading) return;
        setIsLoading(true);

        try {
            await dispatch(updateTaskApi({
                taskId: task.id,
                changes: { startDate: null, endDate: null },
            })).unwrap()
        }
        catch (error) {
            console.error('Failed to save task:', error);
        } finally {
            setIsLoading(false)
        }
    };

    // Показываем кнопку, только если дата установлена
    // if (!task.startDate) {
    //     return null;
    // }

    return (
        <IconButton
            onClick={handleRemoveDate}
            disabled={false}
        >
            <EventBusyIcon color="secondary" />
        </IconButton>
    );
};