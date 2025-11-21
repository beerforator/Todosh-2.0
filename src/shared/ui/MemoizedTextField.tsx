import { TextField } from "@mui/material";
import React from "react";

import styleP from '@/app/styles/TaskDetailsPane.module.scss'

export const MemoizedTextField = React.memo((props: {
    label?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    multiline?: boolean;
    rows?: number;
}) => {
    return (
        <TextField
            fullWidth
            // label={props.label}
            value={props.value}
            onChange={props.onChange}
            margin="normal"
            disabled={props.disabled}
            multiline={props.multiline}
            rows={props.rows}

            className={(props.rows === 1)
                ? styleP.paneBase_field
                : styleP.paneDescription_field}
        />
    );
});