import React from "react";

import { IconButton } from '@mui/material';
import { EditPancilIcon } from "../Icons/TaskIcon";

interface ToggleEditPaneProps {
    handleEditingTask: () => void;
}

export const ToggleEditPane = React.memo(({handleEditingTask}: ToggleEditPaneProps) => {

    return (
        <IconButton onClick={handleEditingTask}>
            <EditPancilIcon/>
        </IconButton>
    )
})