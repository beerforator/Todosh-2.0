import React, { useState } from 'react';
import { Box, Button, Modal, TextField, Typography, IconButton } from '@mui/material';
import { TAG_COLORS } from '@/shared/config/colors';
import { createListApi } from '@/app/services/listServices/createListApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

interface CreateListModalProps {
    onClose: () => void;
}

export const CreateListModal = ({ onClose }: CreateListModalProps) => {
    const [letSubmit, isLettingSubmit] = useApiRequest(createListApi, {
        onFinally: () => {
            onClose()
        }
    })
    const [newListName, setNewListName] = useState('');
    const [newListColor, setNewListColor] = useState(TAG_COLORS[0]);

    const handleSubmit = () => {
        if (!newListName.trim()) return;

        let payload = {
            name: newListName,
            color: newListColor
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
                <Typography variant="h6">Новый список</Typography>
                <TextField
                    fullWidth
                    label="Название списка"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    margin="normal"
                    disabled={isLettingSubmit}
                />
                <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
                    {TAG_COLORS.map(color => (
                        <IconButton
                            key={color}
                            onClick={() => setNewListColor(color)}
                            sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: color,
                                border: newListColor === color ? '2px solid #000' : '2px solid transparent',
                            }}
                        />
                    ))}
                </Box>
                <Button onClick={handleSubmit} variant="contained" disabled={isLettingSubmit}>
                    {isLettingSubmit ? 'Создание...' : 'Создать'}
                </Button>
            </Box>
        </Modal>
    );
};