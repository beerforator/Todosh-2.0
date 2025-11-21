import React from "react";
import { IconButton } from '@mui/material';
import { StarEmptyIcon, StarFullIcon } from "../Icons/TaskIcon";

import style from '@/app/styles/IconStyles.module.scss'

interface ToggleFavouriteProps {
    size: 'small' | 'medium' | 'large';
    isFavourite: boolean;
    isSettingToggle: boolean;
    handleToggle: (e: React.MouseEvent) => void;
}

export const ToggleFavourite = React.memo((props: ToggleFavouriteProps) => {
    const { size, isFavourite, isSettingToggle, handleToggle } = props;

    // if (isSettingToggle) {
    //     const spinnerSize = size === 'small' ? 16 : 16
    //     return <CircularProgress size={spinnerSize} sx={{ p: '12px' }} />;
    // }

    return (
        <IconButton
            // size={size}
            onClick={handleToggle}
            onMouseDown={(e) => e.stopPropagation()}
            disabled={isSettingToggle}

            className={isSettingToggle
                ? (style.taskIconStyle + ' ' + style.iconDisabled)
                : style.taskIconStyle}
        >
            {isFavourite
                ? <StarEmptyIcon />
                : <StarFullIcon />}
        </IconButton>
    )
})