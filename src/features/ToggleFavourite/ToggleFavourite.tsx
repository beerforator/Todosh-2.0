import React from 'react';
import { Task } from '@/shared/types/entities';
import { IconButton, CircularProgress } from '@mui/material';
import StarBorder from '@mui/icons-material/StarBorder';
import Star from '@mui/icons-material/Star';
import { updateTaskApi } from '../../app/services/taskServices/updateTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

interface ToggleFavouriteProps {
    task: Task,
    size?: 'small' | 'medium' | 'large',
    className?: string
}

export const ToggleFavourite = ({ task, size = 'medium' }: ToggleFavouriteProps) => {
    const [setToggle, isSettingToggle] = useApiRequest(updateTaskApi, {})

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();

        let payload = {
            taskId: task.id,
            changes: { isFavourite: !task.isFavourite }
        }

        setToggle(payload)
    }

    if (isSettingToggle) {
        const spinnerSize = size === 'small' ? 16 : 16
        return <CircularProgress size={spinnerSize} sx={{ p: '12px' }} />;
    }

    return (
        <IconButton
            onClick={handleToggle}
            disabled={isSettingToggle}
            onMouseDown={(e) => e.stopPropagation()}
            size={size}
        >
            {task.isFavourite ? <Star color="primary" fontSize="inherit" /> : <StarBorder fontSize="inherit" />}
        </IconButton>
    );
};