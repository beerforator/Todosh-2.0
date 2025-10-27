// src/features/ToggleFavourite/ToggleFavourite.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/store/types';
import { Task } from '@/shared/types/entities';
import { IconButton, CircularProgress } from '@mui/material';
import StarBorder from '@mui/icons-material/StarBorder';
import Star from '@mui/icons-material/Star';
import { updateTaskApi } from '../EditTask/api/updateTaskApi';

interface ToggleFavouriteProps {
    task: Task;
}

export const ToggleFavourite = ({ task }: ToggleFavouriteProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    // Потом добавим гонку обновлений

    const handleToggle = async (e: React.MouseEvent) => {
        console.log(`call Toggle for task ${task.title} loading is ${isLoading}`)

        // Останавливаем "всплытие" события, чтобы не конфликтовать
        // с drag-and-drop или другими родительскими кликами.
        e.stopPropagation();
        if (isLoading) return;

        setIsLoading(true);
        try {
            await dispatch(updateTaskApi({
                taskId: task.id,
                changes: { isFavourite: !task.isFavourite },
            })).unwrap();
        } catch (error) {
            console.error('Failed to toggle favourite status:', error);
        } finally {
            setIsLoading(false);
            console.log(`Toggle is success task ${task.title} loading is ${isLoading}`)
        }
    };

    if (isLoading) {
        // Показываем маленький спиннер вместо иконки во время запроса
        return <CircularProgress size={24} sx={{ p: '12px' }} />;
    }

    return (
        <IconButton onClick={handleToggle} disabled={isLoading}>
            {task.isFavourite ? <Star color="primary" /> : <StarBorder />}
        </IconButton>
    );
};