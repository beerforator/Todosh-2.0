// src/features/ToggleTask/ToggleTask.tsx
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/store/types';
import { updateTask } from '@/entities/Task/model/tasksSlice';
import { Task } from '@/shared/types/entities';
import { Checkbox, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { updateTaskCompletion } from './api/updateTaskCompletion';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

interface ToggleTaskProps {
    task: Task;
}

export const ToggleTask = ({ task }: ToggleTaskProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [isLoading, setLoading] = useState(false)



    const handleToggle = async () => {
        // Диспатчим экшен `updateTask`, который мы создали вчера!
        // `createEntityAdapter` требует специальный формат:
        // `id` - ID сущности для обновления
        // `changes` - объект с полями, которые нужно изменить

        if (isLoading)
            return

        setLoading(true)

        const changes = { isCompleted: !task.isCompleted }

        try {
            await dispatch(updateTaskCompletion({
                id: task.id,
                changes: changes
            })).unwrap()

            dispatch(updateTask({
                id: task.id,
                changes: changes
            }));
        }
        catch (error) {
            console.error("Failed to update task", error)
        } finally {
            setLoading(false)
        }
    };

    if (isLoading)
        return <CircularProgress size={18} style={{ margin: '12px' }} />

    return (
        <Checkbox
            icon={<RadioButtonUncheckedIcon />} 
            checkedIcon={<RadioButtonCheckedIcon />}
            checked={task.isCompleted}
            onChange={handleToggle}
            disabled={isLoading}
        />
    );
};