import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers/store/types';
import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { createTaskApi } from '../../../app/services/taskServices/createTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

interface CalendarCreateModalProps {
    onClose: () => void,
    selectedDate: Date | null
}

export const CalendarCreateModal = ({ onClose, selectedDate }: CalendarCreateModalProps) => {
    const [title, setTitle] = useState('');
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);

    const [letSubmit, isLettingSubmit] = useApiRequest(createTaskApi, {
        onFinally: () => {
            onClose()
        }
    })

    const handleSubmit = () => {
        if (!title.trim() || !selectedDate) return;

        let listOwnerId = (selectedListId === 'all' || selectedListId === 'today') ? '' : selectedListId
        
        let payload = {
            title: title,
            listOwnerId: listOwnerId,
            startDate: selectedDate,
            endDate: selectedDate
        }

        letSubmit(payload)
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
        <Modal open={true} onClose={onClose}>
            <Box sx={modalStyles}>
                <Typography variant="h6" component="h2">
                    Новая задача
                </Typography>
                <TextField
                    fullWidth
                    label="Название задачи"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                    disabled={isLettingSubmit}
                />
                <Button onClick={handleSubmit} variant="contained" disabled={isLettingSubmit}>
                    {isLettingSubmit ? 'Создание...' : 'Создать'}
                </Button>
            </Box>
        </Modal>
    );
};