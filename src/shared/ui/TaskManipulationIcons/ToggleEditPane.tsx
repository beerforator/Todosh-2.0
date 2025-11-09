import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';

interface ToggleEditPaneProps {
    handleEditingTask: () => void;
}

export const ToggleEditPane = React.memo((props: ToggleEditPaneProps) => {
    const { handleEditingTask } = props;


    return (
        <IconButton onClick={handleEditingTask}>
            <EditIcon />
        </IconButton>
    )
})