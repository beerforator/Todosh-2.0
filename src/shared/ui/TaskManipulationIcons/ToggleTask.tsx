import React from 'react';
import { Checkbox, CircularProgress } from '@mui/material';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

interface ToggleTaskProps {
    size: 'small' | 'medium';
    isCompleted: boolean;
    isLettingToggle: boolean;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ToggleTask = React.memo((props: ToggleTaskProps) => {
    const { size, isCompleted, isLettingToggle, handleToggle } = props;

    if (isLettingToggle) {
        const spinnerSize = size === 'small' ? 8 : 24
        return <CircularProgress size={spinnerSize} style={{ margin: '12px' }} />
    }

    return (
        <Checkbox
            icon={<RadioButtonUncheckedIcon />}
            checkedIcon={<RadioButtonCheckedIcon />}
            checked={isCompleted}
            onChange={handleToggle}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            disabled={isLettingToggle}

            sx={{ p: size === 'small' ? '4px' : '12px' }}
        />
    )
})