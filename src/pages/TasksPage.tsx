import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { AppDispatch, RootState } from "@/app/providers/store/types"
import { fetchTasksApi } from "@/app/services/taskServices/fetchTasksApi"
import { List, Task } from "@/shared/types/entities"

import { DragEndEvent } from '@dnd-kit/core';

import { InlineCreateTask } from "@/features/CreateTask/InlineCreateTask/InlineCreateTask"
import { listsSelectors } from "@/app/providers/store/slices/listsSlice"
import { updateTaskApi } from "@/app/services/taskServices/updateTaskApi"
import { ListHeader } from "@/widgets/ListHeader/ListHeader"
import { tasksSelectors } from "@/app/providers/store/slices/tasksSlice"
import { useApiRequest } from "@/shared/hooks/useApiRequest"

import { isToday } from "@/shared/lib/dataFunctions"
import { SMART_LIST_IDS } from "@/shared/config/smartLists"

import styleT from '@/app/styles/MainContentStyles/TasksPage.module.scss'
import styleMC from '@/app/styles/MainContentStyles/MainContent.module.scss'
import { ScrollableView } from "@/shared/ui/ScrollableView"

export type ListView = {
    type: 'list';
    content: Task[];
    isDndEnabled: boolean;
    listName?: string;
};

type GroupedView = {
    type: 'grouped';
    content: ListView[];
    isDndEnabled: boolean;
};

type ViewContent = ListView | GroupedView;

export const TasksPage = () => {
    const dispatch: AppDispatch = useDispatch()

    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId)
    const tasksLoadingStatus = useSelector((state: RootState) => state.tasks.loading)
    const { editingTaskId, detailsPaneMode } = useSelector((state: RootState) => state.uiReducer);
    const allTasks: Task[] = useSelector(tasksSelectors.selectAll)
    const allLists: List[] = useSelector(listsSelectors.selectAll);

    const [isFormVisible, setIsFormVisible] = useState(false);

    const tasksContainerRef = useRef<HTMLDivElement>(null);

    const [setFetchTasks, isSettingFetchTasks] = useApiRequest(fetchTasksApi, {})

    const isPanePersistent = !!editingTaskId && detailsPaneMode === 'persistent';

    useEffect(() => {
        if (tasksLoadingStatus === 'idle') {
            setFetchTasks({})
        }
    }, [tasksLoadingStatus, setFetchTasks])

    // Рендер

    const formattedTasks = useMemo((): ViewContent => {
        if (selectedListId === SMART_LIST_IDS.ALL) {
            const groupedTasks = allLists.reduce((acc, list) => {
                const tasksInList = allTasks
                    .filter(task => task.listOwnerId === list.id)
                    .slice()
                    .sort((a, b) => a.order - b.order);

                if (tasksInList.length > 0) {
                    acc.push({
                        type: 'list',
                        content: tasksInList,
                        isDndEnabled: false,
                        listName: list.name
                    });
                }
                return acc;
            }, [] as ListView[]);

            return { type: 'grouped', content: groupedTasks, isDndEnabled: false };
        }

        if (selectedListId === SMART_LIST_IDS.TODAY) {
            const tasks = allTasks.filter(task => isToday(task.startDate, task.endDate)).slice().sort((a, b) => a.order - b.order);
            return { type: 'list', content: tasks, isDndEnabled: false };
        }

        const tasks = allTasks.filter(task => task.listOwnerId === selectedListId).slice().sort((a, b) => a.order - b.order);
        return { type: 'list', content: tasks, isDndEnabled: true };

    }, [allTasks, allLists, selectedListId]);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event

        const currentTasks = allTasks
            .filter(task => task.listOwnerId === selectedListId)
            .slice()
            .sort((a, b) => a.order - b.order);

        if (over && active.id !== over.id) {
            const oldIndex = currentTasks.findIndex(t => t.id === active.id);
            const newIndex = currentTasks.findIndex(t => t.id === over.id);

            let newOrder: number;

            if (newIndex === 0) {
                newOrder = currentTasks[0].order - 10;
            }
            else if (newIndex === currentTasks.length - 1) {
                newOrder = currentTasks[currentTasks.length - 1].order + 10;
            }
            else {
                const prevTask = currentTasks[newIndex];
                const nextTask = currentTasks[newIndex + (newIndex > oldIndex ? 1 : -1)];
                if (prevTask && nextTask) {
                    newOrder = (prevTask.order + nextTask.order) / 2;
                } else {
                    newOrder = currentTasks[newIndex].order + (newIndex > oldIndex ? 5 : -5);
                }
            }

            dispatch(updateTaskApi({
                taskId: active.id as string,
                changes: { order: newOrder },
            }));
        }
    }, [allTasks, selectedListId, dispatch])

    if (tasksLoadingStatus === 'pending') {
        return (
            <h2>Loading ...</h2>
        )
    }
    if (tasksLoadingStatus === 'failed') {
        return (
            <h2>Failed to get tasks</h2>
        )
    }

    return (
        <>
            <div className={styleMC.listHeader}>
                <ListHeader />
            </div>
            <div ref={tasksContainerRef} className={styleMC.scrollableView}>
                <ScrollableView
                    viewType={formattedTasks.type}
                    tasksContainerRef={tasksContainerRef}

                    tasksArray={formattedTasks.type === "list" ? formattedTasks.content : undefined}
                    groupedTasks={formattedTasks.type === "grouped" ? formattedTasks.content : undefined}

                    isDndEnabled={formattedTasks.isDndEnabled}
                    handleDragEnd={handleDragEnd}

                    selectedListId={selectedListId}
                    isPanePersistent={isPanePersistent}
                />
            </div>
            <div
                className={!isPanePersistent
                    ? (styleT.create_container)
                    : (styleT.create_container + ' ' + styleT.collapsed)}
            >
                <InlineCreateTask
                    listId={selectedListId}
                    onClose={() => setIsFormVisible(false)}
                    onClick={() => setIsFormVisible(true)}
                    isFormVisible={isFormVisible}
                />
            </div>
        </>
    );
}