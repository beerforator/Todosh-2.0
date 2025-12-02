import React from "react";

import { IconButton } from '@mui/material';
import { TodayTaskIcon } from "../Icons/TaskIcon";

import style from '@/app/styles/IconStyles.module.scss'

interface SetTaskTodayProps {
    handleSetToday: (e: React.MouseEvent) => void;
    isSettingTaskOnToday: boolean,
    disabled?: boolean
}

export const SetTaskToday = React.memo(({ handleSetToday, isSettingTaskOnToday, disabled }: SetTaskTodayProps) => {
    // if (isSettingTaskOnToday) {
    //     const spinnerSize = 8
    //     return <CircularProgress size={spinnerSize} style={{ margin: '12px' }} />
    // }

    return (
        <IconButton
            onClick={handleSetToday}
            disabled={isSettingTaskOnToday || disabled}
            className={style.taskIconStyle}
        >
            <TodayTaskIcon />
        </IconButton>
    )
})