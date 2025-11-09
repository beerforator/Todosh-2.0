import { DataLogicFormatRender } from "@/shared/lib/formatDateRender";
import { List } from "@/shared/types/entities";
import { Box, Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import CloseIcon from '@mui/icons-material/Close';
import { ListCircleIcon } from "@/shared/ui/ListCircleIcon";

export const MemoizedListSelect = React.memo((props: {
    value: string;
    onChange: (e: any) => void;
    disabled: boolean;
    lists: List[];
}) => {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FormControl fullWidth margin="normal">
                <InputLabel id="list-select-label">Список</InputLabel>
                <Select
                    labelId="list-select-label"
                    value={props.value}
                    label="Список"
                    onChange={props.onChange}
                    disabled={props.disabled}
                >
                    {props.lists.map(list => (
                        <MenuItem key={list.id} value={list.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                            <ListCircleIcon color={list.color} />
                            {list.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
});

export const PaneHeader = React.memo(({ handleClose }: any) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Детали задачи</Typography>
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </Box>
    );
});

export const PaneFooter = React.memo(({ isSaving, handleSave, taskDates }: any) => {
    return (
        <>
            <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }} disabled={isSaving}>
                {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Сохранить'}
            </Button>
            <DataLogicFormatRender startDate={taskDates.start} endDate={taskDates.end}/> 
        </>
    );
});