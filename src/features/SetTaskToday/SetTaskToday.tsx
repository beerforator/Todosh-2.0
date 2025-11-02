// src/features/SetTaskToday/SetTaskToday.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/store/types';
import { Task } from '@/shared/types/entities';
import { Button, IconButton } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import { updateTaskApi } from '../EditTask/api/updateTaskApi';

interface SetTaskTodayProps {
    task: Task;
}

export const SetTaskToday = ({ task }: SetTaskTodayProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleSetToday = async (e: React.MouseEvent) => {
        e.stopPropagation(); // Останавливаем всплытие для dnd-kit

        if (isLoading) return;
        setIsLoading(true);

        const today = new Date();
        const endDate = new Date(today);
        endDate.setDate(endDate.getDate() + 1)

        try {
            await dispatch(updateTaskApi({
                taskId: task.id,
                changes: { startDate: today, endDate },
            })).unwrap()
        } catch (error) {
            console.error('Failed to save task:', error);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <IconButton
            onClick={handleSetToday}
            disabled={false}
        >
            <TodayIcon color="primary" />
        </IconButton>
    );

    // <IconButton onClick={handleToggle} disabled={isLoading}>
    //     {task.isFavourite ? <Star color="primary" /> : <StarBorder />}
    // </IconButton>
};