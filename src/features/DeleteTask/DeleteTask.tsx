// src/features/DeleteTask/DeleteTask.tsx
import React from 'react';
import { IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTaskApi } from '@/app/services/taskServices/deleteTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

interface DeleteTaskProps {
    taskId: string;
}

export const DeleteTask = ({ taskId }: DeleteTaskProps) => {
    const [letDelete, isLettingDelete] = useApiRequest(deleteTaskApi, {})

    const handleDelete = () => {
        if (!window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
            return;
        }

        let payload = taskId

        letDelete(payload)
    }

    if (isLettingDelete) {
        return <CircularProgress size={24} />;
    }

    return (
        <IconButton onClick={handleDelete} disabled={isLettingDelete}>
            <DeleteIcon />
        </IconButton>
    );
};