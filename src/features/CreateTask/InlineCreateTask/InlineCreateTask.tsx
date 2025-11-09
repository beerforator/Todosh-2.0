import { useState } from "react";
import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { createTaskApi } from "@/app/services/taskServices/createTaskApi";
import { useApiRequest } from "@/shared/hooks/useApiRequest";


interface InlineCreateTaskProps {
    listId: string | null;
    onClose: () => void;
}

export const InlineCreateTask = ({ listId, onClose }: InlineCreateTaskProps) => {
    const [title, setTitle] = useState('');

    const [letSubmit, isLettingSubmit] = useApiRequest(createTaskApi, {
        onFinally: () => {
            setTitle('');
            onClose()
        }
    })

    const handleSubmit = () => {
        if (!title.trim() || !listId) return;

        let listOwnerId

        if (listId === 'all' || listId === 'today')
            listOwnerId = ''
        else
            listOwnerId = listId

        let startDate = undefined
        let endDate = undefined

        if (listId === 'today') {
            const today = new Date();
            endDate = new Date(today);
            startDate = today
        }

        let payload = {
            title: title,
            listOwnerId: listOwnerId,
            startDate: startDate,
            endDate: endDate
        }

        letSubmit(payload)
    }

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
                autoFocus
                disabled={isLettingSubmit}
            />
            <Button variant="contained" onClick={handleSubmit} disabled={isLettingSubmit}>
                {isLettingSubmit ? <CircularProgress size={24} /> : 'Добавить'}
            </Button>
            <Button variant="outlined" onClick={onClose} disabled={isLettingSubmit}>
                Отмена
            </Button>
        </Box>
    );
};
