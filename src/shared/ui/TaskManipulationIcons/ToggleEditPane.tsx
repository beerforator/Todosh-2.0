import React from "react";
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { EditPancilIcon } from "../Icons/TaskIcon";

interface ToggleEditPaneProps {
    handleEditingTask: () => void;
}

export const ToggleEditPane = React.memo((props: ToggleEditPaneProps) => {
    const { handleEditingTask } = props;


    return (
        <IconButton onClick={handleEditingTask}>
            <EditPancilIcon/>
        </IconButton>
    )
})