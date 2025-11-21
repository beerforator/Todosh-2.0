import React from "react";
import { CircularProgress, IconButton } from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';
import { TodayTaskIcon } from "../Icons/TaskIcon";

import style from '@/app/styles/IconStyles.module.scss'

interface SetTaskTodayProps {
    handleSetToday: (e: React.MouseEvent) => void;
    isSettingTaskOnToday: boolean
}

export const SetTaskToday = React.memo((props: SetTaskTodayProps) => {
    const { handleSetToday, isSettingTaskOnToday } = props;

    // if (isSettingTaskOnToday) {
    //     const spinnerSize = 8
    //     return <CircularProgress size={spinnerSize} style={{ margin: '12px' }} />
    // }

    return (
        <IconButton
            onClick={handleSetToday}
            disabled={isSettingTaskOnToday}
            className={style.taskIconStyle}
        >
            <TodayTaskIcon />
        </IconButton>
    )
})