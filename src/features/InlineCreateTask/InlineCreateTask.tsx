import { AppDispatch } from "@/app/providers/store/types";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../TaskModal/api/useCreateTask";
import { Box, Button, CircularProgress, TextField } from "@mui/material";


interface InlineCreateTaskProps {
    listId: string | null; // В какой список добавлять задачу
    onClose: () => void; // Функция, чтобы "спрятать" форму
}

export const InlineCreateTask = ({ listId, onClose }: InlineCreateTaskProps) => {
    const dispatch: AppDispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!title.trim() || !listId) {
            return;
        }

        setIsLoading(true);
        let listOwnerId = listId === 'all' ? '': listId
        try {
            await dispatch(createTask({ title, listOwnerId: listOwnerId })).unwrap();
            setTitle('');
            onClose(); // Закрываем форму после успеха
        } catch (error) {
            console.error('Failed to create task:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Обработчик для нажатия Enter
    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
        if (event.key === 'Escape') {
            onClose();
        }
    };

    return (
        <Box sx={{ display: 'flex', gap: 1, p: 1, border: '1px solid #ccc', borderRadius: '4px' }}>
            <TextField
                fullWidth
                variant="standard"
                placeholder="Название задачи..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                autoFocus // Автоматически ставим фокус на поле ввода
                disabled={isLoading}

                // 
            />
            <Button variant="contained" onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Добавить'}
            </Button>
            <Button variant="outlined" onClick={onClose} disabled={isLoading}>
                Отмена
            </Button>
        </Box>
    );
};