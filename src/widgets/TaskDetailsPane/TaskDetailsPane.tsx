import { AppDispatch, RootState } from "@/app/providers/store/types"
import { Box, Button, CircularProgress, Drawer, FormControl, IconButton, InputLabel, ListItemIcon, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import CloseIcon from '@mui/icons-material/Close';
import { tasksSelectors } from "@/entities/Task/model/tasksSlice";
import { useEffect, useState } from "react";
import { stopEditingTask } from "../UISlice/UISlice";
import { updateTaskApi } from "@/features/EditTask/api/updateTaskApi";
import { listsSelectors } from "@/entities/List/model/listsSlice";
import CircleIcon from '@mui/icons-material/Circle'; // Для иконок списков
import { ToggleFavourite } from "@/features/ToggleFavourite/ToggleFavourite";
import { SetTaskToday } from "@/features/SetTaskToday/SetTaskToday";
import { RemoveTaskDate } from "@/features/RemoveTaskDate/RemoveTaskDate";
import { ToggleTask } from "@/features/ToggleTask/ToggleTask";
import { DeleteTask } from "@/features/DeleteTask/DeleteTask";

interface TaskDetailsPaneProps {
    width: number;
}

export const TaskDetailsPane = ({ width }: TaskDetailsPaneProps) => {
    const dispatch: AppDispatch = useDispatch()
    const { editingTaskId, detailsPaneMode } = useSelector((state: RootState) => state.uiReducer)
    const editingTask = useSelector((state: RootState) => editingTaskId ? tasksSelectors.selectById(state, editingTaskId) : undefined)
    const allLists = useSelector(listsSelectors.selectAll);

    const [isSaving, setIsSaving] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedListId, setSelectedListId] = useState('');

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title)
            setDescription(editingTask.description || '')
            setSelectedListId(editingTask.listOwnerId);
        }
    }, [editingTask])

    const handleClose = () => {
        dispatch(stopEditingTask())
    }

    const handleSave = async () => {
        if (!editingTaskId) return

        setIsSaving(true)

        try {
            await dispatch(updateTaskApi({
                taskId: editingTaskId,
                changes: {
                    title: title,
                    description: description,
                    listOwnerId: selectedListId
                }
            })).unwrap()

            handleClose()
        } catch (error) {
            console.error('Failed to save task:', error);
        } finally {
            setIsSaving(false)
        }
    }

    return (
        <Drawer
            anchor="right"
            open={!!editingTaskId}
            onClose={handleClose}
            variant={detailsPaneMode}
        >
            <Box sx={{ width: width, p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Taks details</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {
                    editingTask ? (
                        <Box component="form" sx={{ mt: 2 }}>
                            <ToggleTask task={editingTask} />
                            <ToggleFavourite task={editingTask} />
                            <SetTaskToday task={editingTask} />
                            <RemoveTaskDate task={editingTask} />
                            <DeleteTask taskId={editingTask.id} />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="list-select-label">Список</InputLabel>
                                <Select
                                    labelId="list-select-label"
                                    value={selectedListId}
                                    label="Список"
                                    onChange={(e) => setSelectedListId(e.target.value)}
                                    disabled={isSaving}
                                >
                                    {allLists.map(list => (
                                        <MenuItem key={list.id} value={list.id}>
                                            <ListItemIcon><CircleIcon fontSize="small" sx={{ color: list.color }} /></ListItemIcon>
                                            {list.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                label="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                margin="normal"
                            />
                            <TextField
                                fullWidth
                                label="Описание"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                margin="normal"
                                multiline
                                rows={4}
                            />
                            <Button variant="contained" onClick={handleSave} sx={{ mt: 2 }}>
                                {isSaving ? <CircularProgress size={24} color="inherit" /> : 'Сохранить'}
                            </Button>
                        </Box>
                    ) : (
                        <Typography sx={{ mt: 2 }}>Загрузка данных...</Typography>
                    )
                }
            </Box>
        </Drawer>
    )
}