import { AppDispatch, RootState } from "@/app/providers/store/types"
import { Box, Button, CircularProgress, Drawer, IconButton, TextField, Typography } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import CloseIcon from '@mui/icons-material/Close';
import { tasksSelectors } from "@/entities/Task/model/tasksSlice";
import { useEffect, useState } from "react";
import { stopEditingTask } from "../UISlice/UISlice";
import { updateTaskApi } from "@/features/EditTask/api/updateTaskApi";

export const TaskDetailsPane = () => {
    const dispatch: AppDispatch = useDispatch()
    const { editingTaskId, detailsPaneMode } = useSelector((state: RootState) => state.uiReducer)
    const editingTask = useSelector((state: RootState) => editingTaskId ? tasksSelectors.selectById(state, editingTaskId) : undefined)

    const [isSaving, setIsSaving] = useState(false)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title)
            setDescription(editingTask.description || '')
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
                    description: description
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
            <Box sx={{ width: 400, p: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6">Taks details</Typography>
                    <IconButton onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                {
                    editingTask ? (
                        <Box component="form" sx={{ mt: 2 }}>
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