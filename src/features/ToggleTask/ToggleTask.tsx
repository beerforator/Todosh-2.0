// src/features/ToggleTask/ToggleTask.tsx
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/store/types';
import { Task } from '@/shared/types/entities';
import { Checkbox, CircularProgress } from '@mui/material';
import { useState } from 'react';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { updateTaskApi } from '../EditTask/api/updateTaskApi';

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
        console.log('Call toggle task')

        if (isLoading)
            return

        setLoading(true)

        const changes = { isCompleted: !task.isCompleted }

        try {
            await dispatch(updateTaskApi({
                taskId: task.id,
                changes: changes
            })).unwrap()
            // Здесь нам не нужно делать второй диспатч, т.к. extraReducer сам уберет задачу из стейта.
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