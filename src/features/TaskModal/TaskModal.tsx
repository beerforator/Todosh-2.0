// src/features/CreateTask/CreateTask.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/store/types';
import { Box, Button, Fab, Modal, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createTask } from './api/useCreateTask';
import { Task } from '@/shared/types/entities';
import { updateTaskApi } from '../EditTask/api/updateTaskApi';

interface TaskModalProps {
    taskToEdit?: Task | null; // Если эта пропса передана, мы в режиме редактирования
    onClose: () => void; // Функция для закрытия модалки
    defaultDates?: { startDate: Date, endDate: Date };
}

export const TaskModal = ({ taskToEdit, onClose, defaultDates }: TaskModalProps) => {
    const dispatch: AppDispatch = useDispatch();
    //const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // const handleOpen = () => setOpen(true);
    // const handleClose = () => setOpen(false);

    const isEditMode = !!taskToEdit

    useEffect(() => {
        if (isEditMode) {
            setTitle(taskToEdit.title)
        }
    }, [taskToEdit, isEditMode])

    const handleSubmit = async () => {
        if (!title.trim()) return; // Не создаем пустые задачи

        setIsLoading(true);
        try {
            if (isEditMode) {
                await dispatch(updateTaskApi({ taskId: taskToEdit.id, changes: { title } })).unwrap()
                // Здесь нам не нужно делать второй диспатч, т.к. extraReducer сам уберет задачу из стейта.
            } else {
                debugger
                await dispatch(createTask({
                    title: title,
                    startDate: defaultDates?.startDate,
                    endDate: defaultDates?.endDate
                })).unwrap();
            }
            handleClose()
        } catch (error) {
            console.error('Operation failed', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        onClose()
        if (!isEditMode) {
            setTitle('')
        }
    }

    const modalStyles = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <>
            <Modal open={true} onClose={handleClose}>
                <Box sx={modalStyles}>
                    <Typography variant="h6" component="h2">
                        {isEditMode ? 'Редактировать задачу' : 'Новая задача'}
                    </Typography>
                    <TextField
                        fullWidth
                        label="Название задачи"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                        disabled={isLoading}
                    />
                    <Button
                        onClick={handleSubmit}
                        variant="contained"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Сохранение...' : (isEditMode ? 'Сохранить' : 'Создать')}
                    </Button>
                </Box>
            </Modal>
        </>
    );
};

export const CreateTaskButton = ({ onClick }: { onClick: () => void }) => {
    const fabStyles: React.CSSProperties = {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
    };

    return (
        <Fab color="primary" style={fabStyles} onClick={onClick}>
            <AddIcon />
        </Fab>
    )
}