import { CircularProgress, IconButton } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

interface DeleteTaskProps {
    handleDelete: () => void,
    isLettingDelete: boolean
}

export const DeleteTask = React.memo((props: DeleteTaskProps) => {
    const { handleDelete, isLettingDelete } = props

    if (isLettingDelete) {
        return <CircularProgress size={24} />;
    }

    return (
        <IconButton onClick={handleDelete} disabled={isLettingDelete}>
            <DeleteIcon />
        </IconButton>
    );
})