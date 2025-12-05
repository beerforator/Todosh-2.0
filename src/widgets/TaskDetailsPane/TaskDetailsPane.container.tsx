import React from "react";
import { useSelector } from 'react-redux';
import { TaskDetailsPane } from './TaskDetailsPane';
import { useDispatch } from "react-redux"
import { useCallback, useEffect, useState } from "react";

import { AppDispatch } from "@/app/providers/store/types"
import { RootState } from '@/app/providers/store/types';
import { Task } from '@/shared/types/entities';
import { stopEditingTask } from "../../app/services/UISlice/UISlice";
import { updateTaskApi } from "@/app/services/taskServices/updateTaskApi";
import { listsSelectors } from "@/app/providers/store/slices/listsSlice";
import { tasksSelectors } from "@/app/providers/store/slices/tasksSlice";
import { useApiRequest } from "@/shared/hooks/useApiRequest";

import styleP from '@/app/styles/TaskDetailsPane.module.scss'

export const TaskDetailsPaneContainer = () => {
    console.log('!!!!!!!!!!!!!!!!Панель деталей см коммент')

    /* ПРАВКИ
    
   [+] 1. Нужно добавить выбор листа
   [+] 2. Дизейблить кнопки дат
   [+] 3. Перенести логику в контейнер
   [+] 4. Классы стилей - проверить названия
   [+] 5. Закрывать панель при переходе на страницу (можно удалить стейт изменения задачи)
   [+] 6. САМОЕ ГЛАВНОЕ - убрать кнопку и посылать запросы на сервак в фоне или при потере фокуса
    
   !!! Есть небольшой баг из-за отсутствия дизейбла полей

    */

    const dispatch: AppDispatch = useDispatch()

    const { editingTaskId, detailsPaneMode } = useSelector((state: RootState) => state.uiReducer);
    const editingTask = useSelector((state: RootState) => editingTaskId ? tasksSelectors.selectById(state, editingTaskId) : undefined)
    const allLists = useSelector(listsSelectors.selectAll);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedListId, setSelectedListId] = useState('');

    const [setSave, isSettingFetchTasks] = useApiRequest(updateTaskApi, {
        // onFinally: () => { handleClose() }
        useExternalLoading: true
    })

    useEffect(() => {
        if (editingTask) {
            setTitle(editingTask.title)
            setDescription(editingTask.description)
            setSelectedListId(editingTask.listOwnerId);
        } else {
            handleClose()
        }
    }, [editingTask])

    useEffect(() => {
        if (!editingTask) return;

        const handler = setTimeout(() => {

            const changes: Partial<Task> = {};
            if (title !== editingTask.title) changes.title = title;
            if (description !== editingTask.description) changes.description = description;
            if (selectedListId !== editingTask.listOwnerId) changes.listOwnerId = selectedListId;

            if (Object.keys(changes).length > 0) {
                setSave({ taskId: editingTask.id, changes })
            }
        }, 500);

        return () => {
            clearTimeout(handler);
        };

    }, [title, description, selectedListId, editingTaskId, editingTask, setSave]);

    const handleClose = useCallback(() => {
        dispatch(stopEditingTask())
    }, [dispatch])

    const handleListChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedListId(e.target.value)
    }, [])

    const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }, [])

    const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }, [])

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
                variant={detailsPaneMode}

                selectedListId={selectedListId}
                stateTitle={title}
                stateDescription={description}


                handleClose={handleClose}
                // handleSave={handleSave}
                handleListChange={handleListChange}
                handleTitleChange={handleTitleChange}
                handleDescriptionChange={handleDescriptionChange}

                isSettingFetchTasks={isSettingFetchTasks}
            />
        </div>
    );
};