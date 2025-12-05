import React from "react";

import { DataLogicFormatRender } from "@/shared/ui/formatDateRender";
import { List } from "@/shared/types/entities";
import { FormControl, IconButton, ListItemIcon, MenuItem, Select, Typography } from "@mui/material";
import { ListCircleIcon } from "@/shared/ui/ListCircleIcon";
import { CloseIcon } from "@/shared/ui/Icons/TaskIcon";
import { DeleteTaskContainer } from "@/features/DeleteTask/DeleteTaskContainer";

import styleP from '@/app/styles/TaskDetailsPane.module.scss'

interface MemoizedListSelectProps {
    value: string;
    onChange: (e: any) => void;
    disabled: boolean;
    lists: List[];
}

export const MemoizedListSelect = React.memo((props: MemoizedListSelectProps) => {
    return (
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
                        <ListItemIcon>
                            <ListCircleIcon color={list.color} />
                        </ListItemIcon>
                        {list.name}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});

interface PaneHeaderProps {
    handleClose: () => void
}

export const PaneHeader = React.memo(({ handleClose }: PaneHeaderProps) => {
    return (
        <div className={styleP.paneHeader}>
            <Typography fontWeight={600} variant="h6">Task Details</Typography>
            <IconButton onClick={handleClose}><CloseIcon /></IconButton>
        </div>
    );
});

interface PaneFooterProps {
    taskId: string,
    isSaving?: boolean,
    taskDates: { start: Date | null | undefined; end: Date | null | undefined; }
}

export const PaneFooter = React.memo(({ taskId, isSaving, taskDates }: PaneFooterProps) => {
    return (
        <div className={styleP.paneFooter}>
            <div className={styleP.paneFooter_inner}>
                <div className={styleP.paneFooterDate}>
                    <DataLogicFormatRender startDate={taskDates.start} endDate={taskDates.end} />
                </div>
                <DeleteTaskContainer taskId={taskId} />
            </div>
        </div>
    );
});