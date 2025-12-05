import { AppDispatch, RootState } from "@/app/providers/store/types"
import { Box, Drawer, ListItemText, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect, useMemo, useState } from "react";
import { stopEditingTask } from "../../app/services/UISlice/UISlice";
import { updateTaskApi } from "@/app/services/taskServices/updateTaskApi";
import { listsSelectors } from "@/app/providers/store/slices/listsSlice";
import { ToggleFavouriteContainer } from "@/features/ToggleFavourite/ToggleFavouriteContainer";
import { RemoveTaskDatePaneContainer } from "@/features/RemoveTaskDate/RemoveTaskDatePaneContainer";
import { ToggleTaskContainer } from "@/features/ToggleTask/ToggleTaskContainer";
import { DeleteTaskContainer } from "@/features/DeleteTask/DeleteTaskContainer";
import { tasksSelectors } from "@/app/providers/store/slices/tasksSlice";
import { useApiRequest } from "@/shared/hooks/useApiRequest";
import React from "react";
import { MemoizedListSelect, PaneFooter, PaneHeader } from "./ui/TaskDetailPaneSections";
import { MemoizedTextField } from "@/shared/ui/MemoizedTextField";

import styleP from '@/app/styles/TaskDetailsPane.module.scss'
import { SetTaskTodayPaneContainer } from "@/features/SetTaskToday/SetTaskTodayPaneContainer";
import { List, Task } from "@/shared/types/entities";
import { isHasDate, isToday } from "@/shared/lib/dataFunctions";


interface TaskDetailsPaneProps {
    task: Task,
    allLists: List[],
    variant: "temporary" | "persistent" | "permanent" | undefined,

    selectedListId: string,
    stateTitle: string,
    stateDescription: string,

    handleClose: () => void,
    // handleSave: () => void,
    handleListChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    handleDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void,

    isSettingFetchTasks: boolean
}

export const TaskDetailsPane = React.memo((
    { task, allLists, variant, selectedListId, stateTitle,
        stateDescription, handleClose, handleListChange,
        handleTitleChange, handleDescriptionChange, isSettingFetchTasks
    }: TaskDetailsPaneProps) => {

    const taskDates = useMemo(() => ({
        start: task.startDate,
        end: task.endDate,
    }), [task.startDate, task.endDate]);

    isToday(task.startDate, task.endDate)

    return (
        <Drawer
            anchor="right"
            open={!!task.id}
            // onClose={handleClose}
            variant={variant}
            className={styleP.drawerStyle}
        >
            <div className={styleP.paneContainer}>
                <PaneHeader handleClose={handleClose} />

                {
                    task ? (
                        <Box component="form" className={styleP.paneContainer}>
                            <div className={styleP.paneBase}>
                                <ToggleTaskContainer taskId={task.id} />
                                <div className={styleP.paneBase_field}>
                                    <MemoizedTextField
                                        value={stateTitle}
                                        onChange={handleTitleChange}
                                        disabled={isSettingFetchTasks}
                                        rows={1}
                                    />
                                </div>
                                <ToggleFavouriteContainer taskId={task.id} />
                            </div>

                            <div className={styleP.paneDate}>
                                {
                                    !isToday(task.startDate, task.endDate) &&
                                    <SetTaskTodayPaneContainer
                                        taskId={task.id}
                                    // disabled={isToday(task.startDate, task.endDate)}
                                    />
                                }
                                {
                                    (!isToday(task.startDate, task.endDate) && isHasDate(task.startDate, task.endDate)) &&
                                    <div className={styleP.dateDivider}></div>
                                }
                                {
                                    isHasDate(task.startDate, task.endDate) &&
                                    <RemoveTaskDatePaneContainer
                                        taskId={task.id}
                                    // disabled={!isHasDate(task.startDate, task.endDate)}
                                    />
                                }
                            </div>

                            <div className={styleP.paneBase}>
                                <MemoizedListSelect
                                    value={selectedListId}
                                    onChange={handleListChange}
                                    disabled={isSettingFetchTasks}
                                    lists={allLists}
                                />
                            </div>

                            <div className={styleP.paneDescription}>
                                <ListItemText className={styleP.paneText} primary={"Task description"} />
                                <MemoizedTextField
                                    value={stateDescription}
                                    onChange={handleDescriptionChange}
                                    disabled={isSettingFetchTasks}
                                    multiline
                                // rows={4}
                                />
                            </div>

                            <PaneFooter
                                taskId={task.id}
                                isSaving={isSettingFetchTasks}
                                // handleSave={handleSave}
                                taskDates={taskDates}
                            />
                        </Box>
                    ) : (
                        <Typography sx={{ mt: 2 }}>Загрузка данных...</Typography>
                    )
                }
            </div>
        </Drawer>
    )
})