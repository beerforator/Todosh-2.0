import { CircularProgress, IconButton } from "@mui/material";
import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { TrashIcon } from "../Icons/TaskIcon";

import style from '@/app/styles/IconStyles.module.scss'

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
        <IconButton
            onClick={handleDelete}
            disabled={isLettingDelete}
            className={isLettingDelete
                ? (style.taskIconStyle + ' ' + style.iconDisabled)
                : style.taskIconStyle}
            style={{margin: '8px'}}
        >
            <TrashIcon />
        </IconButton>
    );
})