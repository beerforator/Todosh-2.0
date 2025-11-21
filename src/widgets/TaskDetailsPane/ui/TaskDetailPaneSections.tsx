import { DataLogicFormatRender } from "@/shared/lib/formatDateRender";
import { List } from "@/shared/types/entities";
import { Box, Button, CircularProgress, FormControl, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import React from "react";
import { ListCircleIcon } from "@/shared/ui/ListCircleIcon";

import styleP from '@/app/styles/TaskDetailsPane.module.scss'
import { CloseIcon } from "@/shared/ui/Icons/TaskIcon";
import { DeleteTaskContainer } from "@/features/DeleteTask/DeleteTaskContainer";

export const MemoizedListSelect = React.memo((props: {
    value: string;
    onChange: (e: any) => void;
    disabled: boolean;
    lists: List[];
}) => {
    return (
        // <div className={styleP.somediv}>
        <FormControl className={styleP.formControl}>
            {/* <InputLabel id="list-select-label">Список</InputLabel> */}
            <Select
                labelId="list-select-label"
                value={props.value}
                onChange={props.onChange}
                disabled={props.disabled}

                className={styleP.baseSelect}
            >
                {props.lists.map(list => (
                    <MenuItem key={list.id} value={list.id} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        {/* <ListCircleIcon color={list.color} /> */}
                        {list.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
        // </div>
    );
});

export const PaneHeader = React.memo(({ handleClose }: any) => {
    return (
        <div className={styleP.paneHeader}>
            <Typography fontWeight={600} variant="h6">Task Details</Typography>
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </div>
    );
});

export const PaneFooter = React.memo(({ taskId, isSaving, handleSave, taskDates }: any) => {
    return (
        <div className={styleP.paneFooter}>
            <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }} disabled={isSaving}>
                {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Сохранить'}
            </Button>
            <div className={styleP.paneFooter_inner}>
                <div className={styleP.paneFooterDate}>
                    <DataLogicFormatRender startDate={taskDates.start} endDate={taskDates.end} />
                </div>
                <DeleteTaskContainer taskId={taskId} />
            </div>
        </div>
    );
});