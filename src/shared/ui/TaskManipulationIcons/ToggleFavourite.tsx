import React from "react";
import { IconButton, CircularProgress } from '@mui/material';
import StarBorder from '@mui/icons-material/StarBorder';
import Star from '@mui/icons-material/Star';

interface ToggleFavouriteProps {
    size: 'small' | 'medium' | 'large';
    isFavourite: boolean;
    isSettingToggle: boolean;
    handleToggle: (e: React.MouseEvent) => void;
}

export const ToggleFavourite = React.memo((props: ToggleFavouriteProps) => {
    const { size, isFavourite, isSettingToggle, handleToggle } = props;

    if (isSettingToggle) {
        const spinnerSize = size === 'small' ? 16 : 16
        return <CircularProgress size={spinnerSize} sx={{ p: '12px' }} />;
    }

    return (
        <IconButton
            size={size}
            onClick={handleToggle}
            onMouseDown={(e) => e.stopPropagation()}
            disabled={isSettingToggle}
        >
            {isFavourite ? <Star color="primary" fontSize="inherit" /> : <StarBorder fontSize="inherit" />}
        </IconButton>
    )
})