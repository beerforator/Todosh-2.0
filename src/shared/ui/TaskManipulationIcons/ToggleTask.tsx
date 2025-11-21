import React from 'react';
import { Checkbox } from '@mui/material';

import style from '@/app/styles/IconStyles.module.scss'
import { ToggleEmptyIcon, ToggleFullIcon } from '../Icons/TaskIcon';

interface ToggleTaskProps {
    size: 'small' | 'medium';
    isCompleted: boolean;
    isLettingToggle: boolean;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ToggleTask = React.memo((props: ToggleTaskProps) => {
    const { size, isCompleted, isLettingToggle, handleToggle } = props;

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
        // sx={{ p: size === 'small' ? '4px' : '12px' }}
        />
    )
})