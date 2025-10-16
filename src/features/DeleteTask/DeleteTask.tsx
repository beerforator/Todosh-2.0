// src/features/DeleteTask/DeleteTask.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/store/types';
import { IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTask } from './api/deleteTask';

interface DeleteTaskProps {
    taskId: string;
}

export const DeleteTask = ({ taskId }: DeleteTaskProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    const handleDelete = async () => {
        // Запрашиваем подтверждение у пользователя.
        // Если он нажмет "Отмена", `confirm` вернет false, и мы прервем выполнение.
        if (!window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
            return;
        }

        setIsLoading(true);
        try {
            await dispatch(deleteTask(taskId)).unwrap();
            // Здесь нам не нужно делать второй диспатч, т.к. extraReducer сам уберет задачу из стейта.
        } catch (error) {
            console.error('Failed to delete task:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <CircularProgress size={24} />;
    }

    return (
        <IconButton onClick={handleDelete} disabled={isLoading}>
            <DeleteIcon />
        </IconButton>
    );
};