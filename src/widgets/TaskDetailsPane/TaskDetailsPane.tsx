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


interface TaskDetailsPaneProps {
    task: Task,
    allLists: List[],
    selectedListId: string,
    variant: "temporary" | "persistent" | "permanent" | undefined,

    handleClose: () => void,
    handleSave: () => void,
    handleListChange: (e: any) => void,
    handleTitleChange: (e: any) => void,
    handleDescriptionChange: (e: any) => void,
    // taskDates: () => { start: Date | null | undefined; end: Date | null | undefined; }

    isSettingFetchTasks: boolean
}

export const TaskDetailsPane = React.memo(({
    task,
    allLists,
    selectedListId,
    variant,
    handleClose,
    handleSave,
    handleListChange,
    handleTitleChange,
    handleDescriptionChange,
    isSettingFetchTasks
}: TaskDetailsPaneProps) => {
    const taskDates = useMemo(() => ({
        start: task.startDate,
        end: task.endDate,
    }), [task.startDate, task.endDate]);

    return (
        <Drawer
            anchor="right"
            open={!!task.id}
            onClose={handleClose}
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
                                        value={task.title}
                                        onChange={handleTitleChange}
                                        disabled={isSettingFetchTasks}
                                        rows={1}
                                    />
                                </div>
                                <ToggleFavouriteContainer taskId={task.id} />
                            </div>
                            <div>
                                <MemoizedListSelect
                                    value={selectedListId}
                                    onChange={handleListChange}
                                    disabled={isSettingFetchTasks}
                                    lists={allLists}
                                />
                            </div>
                            <div className={styleP.paneDate}>
                                <SetTaskTodayPaneContainer taskId={task.id} />
                                <div className={styleP.dateDivider}></div>
                                <RemoveTaskDatePaneContainer taskId={task.id} />
                            </div>
                            <div className={styleP.paneDescription}>
                                <ListItemText className={styleP.paneText} primary={"Task description"} />
                                <MemoizedTextField
                                    value={task.description}
                                    onChange={handleDescriptionChange}
                                    disabled={isSettingFetchTasks}
                                    multiline
                                // rows={4}
                                />
                            </div>

                            <PaneFooter
                                taskId={task.id}
                                isSaving={isSettingFetchTasks}
                                handleSave={handleSave}
                                taskDates={taskDates}
                            // className={styleP.paneFooter}
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