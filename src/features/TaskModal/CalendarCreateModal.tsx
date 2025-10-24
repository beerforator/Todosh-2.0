// src/features/CreateTask/CreateTask.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/providers/store/types';
import { Box, Button, Fab, Modal, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { createTask } from './api/useCreateTask';
import { Task } from '@/shared/types/entities';
import { updateTaskApi } from '../EditTask/api/updateTaskApi';

interface CalendarCreateModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title: string;
    onTitleChange: (newTitle: string) => void;
    isLoading: boolean;
}

export const CalendarCreateModal = (props: CalendarCreateModalProps) => {
    const { isOpen, onClose, onSubmit, title, onTitleChange, isLoading } = props;

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
        <Typography variant="h6" component="h2">
          Новая задача
        </Typography>
        <TextField
          fullWidth
          label="Название задачи"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          margin="normal"
          disabled={isLoading}
        />
        <Button onClick={onSubmit} variant="contained" disabled={isLoading}>
          {isLoading ? 'Создание...' : 'Создать'}
        </Button>
      </Box>
    </Modal>
  );
};