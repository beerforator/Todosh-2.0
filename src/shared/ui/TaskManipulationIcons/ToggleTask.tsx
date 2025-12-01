import React from 'react';

import { Checkbox } from '@mui/material';
import { ToggleEmptyIcon, ToggleFullIcon } from '../Icons/TaskIcon';

import style from '@/app/styles/IconStyles.module.scss'

interface ToggleTaskProps {
    size: 'small' | 'medium';
    isCompleted: boolean;
    isLettingToggle: boolean;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ToggleTask = React.memo(({size, isCompleted, isLettingToggle, handleToggle}: ToggleTaskProps) => {
    // if (isLettingToggle) {
    //     const spinnerSize = size === 'small' ? 8 : 24
    //     return <CircularProgress
    //         // size={spinnerSize}
    //         className={style.taskIconStyle}
    //     />
    // }

    return (
        <Checkbox
            icon={<ToggleEmptyIcon />}
            checkedIcon={<ToggleFullIcon />}
            checked={isCompleted}
            onChange={handleToggle}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            disabled={isLettingToggle}

            className={isLettingToggle
                ? (style.taskIconStyle + ' ' + style.iconDisabled)
                : style.taskIconStyle}
            sx={{ p: size === 'small' ? '2px' : '0px' }}
        />
    )
})