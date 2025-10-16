// src/features/CreateTask/CreateTask.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/store/types';
import { Box, Button, Fab, Modal, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createTask } from './api/createTask';

export const CreateTask = () => {
    const dispatch: AppDispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        if (!title.trim()) return; // Не создаем пустые задачи

        setIsLoading(true);
        try {
            await dispatch(createTask({ title })).unwrap();
            setTitle(''); // Очищаем поле ввода
            handleClose(); // Закрываем модальное окно
        } catch (error) {
            console.error('Failed to create task:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fabStyles: React.CSSProperties = {
        position: 'fixed',
        bottom: '30px',
        right: '30px',
    };

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
            <Fab color="primary" style={fabStyles} onClick={handleOpen}>
                <AddIcon />
            </Fab>
            <Modal open={open} onClose={handleClose}>
                <Box sx={modalStyles}>
                    <Typography variant="h6" component="h2">Новая задача</Typography>
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
                        {isLoading ? 'Создание...' : 'Создать'}
                    </Button>
                </Box>
            </Modal>
        </>
    );
};