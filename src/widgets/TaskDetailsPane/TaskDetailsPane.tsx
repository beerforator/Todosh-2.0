import { AppDispatch, RootState } from "@/app/providers/store/types"
import { Box, Drawer, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect, useMemo, useState } from "react";
import { stopEditingTask } from "../../app/services/UISlice/UISlice";
import { updateTaskApi } from "@/app/services/taskServices/updateTaskApi";
import { listsSelectors } from "@/app/providers/store/slices/listsSlice";
import { ToggleFavouriteContainer } from "@/features/ToggleFavourite/ToggleFavouriteContainer";
import { SetTaskTodayContainer } from "@/features/SetTaskToday/SetTaskTodayContainer";
import { RemoveTaskDateContainer } from "@/features/RemoveTaskDate/RemoveTaskDateContainer";
import { ToggleTaskContainer } from "@/features/ToggleTask/ToggleTaskContainer";
import { DeleteTaskContainer } from "@/features/DeleteTask/DeleteTaskContainer";
import { tasksSelectors } from "@/app/providers/store/slices/tasksSlice";
import { useApiRequest } from "@/shared/hooks/useApiRequest";
import React from "react";
import { MemoizedListSelect, PaneFooter, PaneHeader } from "./ui/TaskDetailPaneSections";
import { MemoizedTextField } from "@/shared/ui/MemoizedTextField";

interface TaskDetailsPaneProps {
    taskId: string,
    width: number;
    variant: "temporary" | "persistent" | "permanent" | undefined
}

export const TaskDetailsPane = React.memo(({ taskId, width, variant }: TaskDetailsPaneProps) => {
    const dispatch: AppDispatch = useDispatch()
    const editingTask = useSelector((state: RootState) => taskId ? tasksSelectors.selectById(state, taskId) : undefined)
    const allLists = useSelector(listsSelectors.selectAll);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedListId, setSelectedListId] = useState('');

    const [setSave, isSettingFetchTasks] = useApiRequest(updateTaskApi, {
        onFinally: () => { handleClose() }
    })

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title)
            setDescription(editingTask.description || '')
            setSelectedListId(editingTask.listOwnerId);
        } else {
            handleClose()
        }
    }, [editingTask])

    const handleClose = useCallback(() => {
        dispatch(stopEditingTask())
    }, [dispatch])

    const handleSave = useCallback(async () => {
        if (!taskId) return

        const payload = {
            taskId: taskId,
            changes: {
                title: title,
                description: description,
                listOwnerId: selectedListId
            }
        }

        setSave(payload)
    }, [taskId, title, description, selectedListId, setSave])

    const handleListChange = useCallback((e: any) => {
        setSelectedListId(e.target.value)
    }, [])

    const handleTitleChange = useCallback((e: any) => {
        setTitle(e.target.value)
    }, [])

    const handleDescriptionChange = useCallback((e: any) => {
        setDescription(e.target.value)
    }, [])

    const taskDates = useMemo(() => ({
        start: editingTask?.startDate,
        end: editingTask?.endDate,
    }), [editingTask?.startDate, editingTask?.endDate]);

    return (
        <Drawer
            anchor="right"
            open={!!taskId}
            onClose={handleClose}
            variant={variant}
        >
            <Box sx={{ width: width, p: 2 }}>
                <PaneHeader handleClose={handleClose} />

                {
                    editingTask ? (
                        <Box component="form" sx={{ mt: 2 }}>
                            <ToggleTaskContainer taskId={editingTask.id} />
                            <ToggleFavouriteContainer taskId={editingTask.id} />
                            <SetTaskTodayContainer taskId={editingTask.id} />
                            <RemoveTaskDateContainer taskId={editingTask.id} />
                            <DeleteTaskContainer taskId={editingTask.id} />
                            <Box sx={{ display: 'flex', alignItems: 'center', border: `6px solid red` }}>
                                <MemoizedTextField
                                    label="Название"
                                    value={title}
                                    onChange={handleTitleChange}
                                    disabled={isSettingFetchTasks}
                                />
                                <MemoizedListSelect
                                    value={selectedListId}
                                    onChange={handleListChange}
                                    disabled={isSettingFetchTasks}
                                    lists={allLists}
                                />
                            </Box>
                            <MemoizedTextField
                                label="Описание"
                                value={description}
                                onChange={handleDescriptionChange}
                                disabled={isSettingFetchTasks}
                                multiline
                                rows={4}
                            />
                            <PaneFooter isSaving={isSettingFetchTasks} handleSave={handleSave} taskDates={taskDates} />
                        </Box>
                    ) : (
                        <Typography sx={{ mt: 2 }}>Загрузка данных...</Typography>
                    )
                }
            </Box>
        </Drawer>
    )
})