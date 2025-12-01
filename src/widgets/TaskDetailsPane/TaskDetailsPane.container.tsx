import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers/store/types';
import { TaskDetailsPane } from './TaskDetailsPane';

import { AppDispatch } from "@/app/providers/store/types"
import { Box, Drawer, ListItemText, Typography } from "@mui/material"
import { useDispatch } from "react-redux"
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

export const TaskDetailsPaneContainer = () => {
    console.log('Перенести сетевые запросы и функции СЮДА из ребенка')
    console.log('Панель деталей пока не трогал см коммент')

    /* ПРАВКИ
    
    1. Нужно добавить выбор листа
    2. Дизейблить кнопки дат
    3. Перенести логику в контейнер
    4. Классы стилей - проверить названия
    5. Закрывать панель при переходе на страницу (можно удалить стейт изменения задачи)
    6. САМОЕ ГЛАВНОЕ - убрать кнопку и посылать запросы на сервак в фоне или при потере фокуса

    */

    const dispatch: AppDispatch = useDispatch()

    const { editingTaskId, detailsPaneMode } = useSelector((state: RootState) => state.uiReducer);
    const editingTask = useSelector((state: RootState) => editingTaskId ? tasksSelectors.selectById(state, editingTaskId) : undefined)
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
        if (!editingTaskId) return

        const payload = {
            taskId: editingTaskId,
            changes: {
                title: title,
                description: description,
                listOwnerId: selectedListId
            }
        }

        setSave(payload)
    }, [editingTaskId, title, description, selectedListId, setSave])

    const handleListChange = useCallback((e: any) => {
        setSelectedListId(e.target.value)
    }, [])

    const handleTitleChange = useCallback((e: any) => {
        setTitle(e.target.value)
    }, [])

    const handleDescriptionChange = useCallback((e: any) => {
        setDescription(e.target.value)
    }, [])

    // const taskDates = useMemo(() => ({
    //     start: editingTask?.startDate,
    //     end: editingTask?.endDate,
    // }), [editingTask?.startDate, editingTask?.endDate]);


    alert('Не работают хендлеры')

    if (!editingTask) {
        return null;
    }

    return (
        <div className={(!!editingTaskId && detailsPaneMode === 'persistent')
            ? (styleP.drawerContainer)
            : (styleP.drawerContainerr + ' ' + styleP.drawerContainer_closed)}
        >
            <TaskDetailsPane
                task={editingTask}
                allLists={allLists}
                selectedListId={selectedListId}
                variant={detailsPaneMode}

                handleClose={handleClose}
                handleSave={handleSave}
                handleListChange={handleListChange}
                handleTitleChange={handleTitleChange}
                handleDescriptionChange={handleDescriptionChange}
                // taskDates={taskDates}

                isSettingFetchTasks={isSettingFetchTasks}
            />
        </div>
    );
};