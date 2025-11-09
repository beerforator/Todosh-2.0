import React from "react";
import { CircularProgress, IconButton } from '@mui/material';
import EventBusyIcon from '@mui/icons-material/EventBusy';

interface RemoveTaskDateProps {
    handleRemoveDate: () => void;
    isLettingRemoveDate: boolean
}

export const RemoveTaskDate = React.memo((props: RemoveTaskDateProps) => {
    const { handleRemoveDate, isLettingRemoveDate } = props

    if (isLettingRemoveDate) {
        const spinnerSize = 8
        return <CircularProgress size={spinnerSize} style={{ margin: '12px' }} />
    }

    return (
        <IconButton
            onClick={handleRemoveDate}
            disabled={false}
        >
            <EventBusyIcon color="secondary" />
        </IconButton>
    )
})