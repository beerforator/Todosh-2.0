// src/features/CreateList/CreateListModal.tsx
import React from 'react';
import { Box, Button, Modal, TextField, Typography, IconButton } from '@mui/material';
import { TAG_COLORS } from '@/shared/config/colors';

// 1. Полностью новый, "глупый" интерфейс
interface CreateListModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    name: string;
    onNameChange: (newName: string) => void;
    selectedColor: string;
    onColorChange: (newColor: string) => void;
    isLoading: boolean;
}

export const CreateListModal = (props: CreateListModalProps) => {
    const {
        isOpen,
        onClose,
        onSubmit,
        name,
        onNameChange,
        selectedColor,
        onColorChange,
        isLoading
    } = props;

    // 2. Убрана ВСЯ внутренняя логика и состояние (useState, useDispatch, handleSubmit)

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
        <Modal open={isOpen} onClose={onClose}>
            <Box sx={modalStyles}>
                <Typography variant="h6">Новый список</Typography>
                <TextField
                    fullWidth
                    label="Название списка"
                    value={name} // Используем пропс
                    onChange={(e) => onNameChange(e.target.value)} // Вызываем родительскую функцию
                    margin="normal"
                    disabled={isLoading}
                />
                <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                    {TAG_COLORS.map(color => (
                        <IconButton
                            key={color}
                            onClick={() => onColorChange(color)} // Вызываем родительскую функцию
                            sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: color,
                                border: selectedColor === color ? '2px solid #000' : '2px solid transparent',
                            }}
                        />
                    ))}
                </Box>
                <Button onClick={onSubmit} variant="contained" disabled={isLoading}>
                    {isLoading ? 'Создание...' : 'Создать'}
                </Button>
            </Box>
        </Modal>
    );
};