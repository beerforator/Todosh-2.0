import { AppDispatch, RootState } from "@/app/providers/store/types"
import { fetchTasksApi } from "@/app/services/taskServices/fetchTasksApi"
import { List, Task } from "@/shared/types/entities"
import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { Box, Button } from "@mui/material"
import { InlineCreateTask } from "@/features/CreateTask/InlineCreateTask/InlineCreateTask"
import AddIcon from '@mui/icons-material/Add';
import { ALL_TASKS_LIST_ID, listsSelectors, TODAY_TASKS_LIST_ID } from "@/app/providers/store/slices/listsSlice"
import { updateTaskApi } from "@/app/services/taskServices/updateTaskApi"
import { ListHeader } from "@/widgets/ListHeader/ListHeader"
import { tasksSelectors } from "@/app/providers/store/slices/tasksSlice"
import { useApiRequest } from "@/shared/hooks/useApiRequest"
import React from "react"
import { SectionTitle } from "@/shared/ui/SectionTitle"
import { MemoizedTaskCardWrapper } from "@/entities/Task/MemoizedTaskCardWrapper"

export const TasksPage = () => {
    console.log('TasksPage')

    const dispatch: AppDispatch = useDispatch()
    // ЧТО БУДЕТ ЕСЛИ АЙДИ ВЫБРАННОГО ТЭГА НЕ УСЕЕТ ДОЙТИ ?!
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId)
    const tasksLoadingStatus = useSelector((state: RootState) => state.tasks.loading)
    const [isFormVisible, setIsFormVisible] = useState(false);

    const allTasks: Task[] = useSelector(tasksSelectors.selectAll)
    const allLists: List[] = useSelector(listsSelectors.selectAll);

    const [setFetchTasks, isSettingFetchTasks] = useApiRequest(fetchTasksApi, {})

    useEffect(() => {
        if (tasksLoadingStatus === 'idle') {
            setFetchTasks({})
        }
    }, [tasksLoadingStatus, setFetchTasks])

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



    const isToday = (someDate: Date | null | undefined): boolean => {
        if (!someDate) return false;
        const today = new Date();
        const date = new Date(someDate);
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

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

    // Рендер

    const renderSortableTaskCard = useCallback((task: Task) => {
        return (
            <MemoizedTaskCardWrapper
                key={task.id}
                task={task}
            />
        )
    }, [])

    const renderContent = () => {
        if (selectedListId !== ALL_TASKS_LIST_ID && selectedListId !== TODAY_TASKS_LIST_ID) {
            const filteredAndSortedTasks = allTasks
                .filter(task => task.listOwnerId === selectedListId)
                .slice()
                .sort((a, b) => a.order - b.order);

            return (
                <>
                    <ListHeader />
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={filteredAndSortedTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                            {filteredAndSortedTasks.map(task => (
                                renderSortableTaskCard(task)
                            ))}
                        </SortableContext>
                    </DndContext>
                </>
            );
        } else if (selectedListId === TODAY_TASKS_LIST_ID) {
            const tasksToRender = allTasks
                .filter(task => isToday(task.startDate))
                .slice()
                .sort((a, b) => a.order - b.order);

            return (
                <>
                    <ListHeader />
                    <Box mb={4}>
                        {tasksToRender.map(task => (
                            renderSortableTaskCard(task)
                        ))}
                    </Box>
                </>
            );
        } else if (selectedListId === ALL_TASKS_LIST_ID) {
            const groupedTasks = allLists.reduce((acc, list) => {
                const tasksInList = allTasks
                    .filter(task => task.listOwnerId === list.id)
                    .slice()
                    .sort((a, b) => a.order - b.order);

                if (tasksInList.length > 0) {
                    acc[list.id] = {
                        listName: list.name,
                        tasks: tasksInList,
                    };
                }
                return acc;
            }, {} as Record<string, { listName: string; tasks: Task[] }>);

            return (
                <>
                    <ListHeader />
                    {Object.values(groupedTasks).map(({ listName, tasks }) => (
                        <Box key={listName} mb={4}>
                            <SectionTitle>{listName}</SectionTitle>
                            {tasks.map(task => (
                                renderSortableTaskCard(task)
                            ))}
                        </Box>
                    ))}
                </>
            );
        }
    };

    return (
        <div>
            {renderContent()}
            {isFormVisible ? (
                <InlineCreateTask
                    listId={selectedListId}
                    onClose={() => setIsFormVisible(false)}
                />
            ) : (
                <Button
                    startIcon={<AddIcon />}
                    onClick={() => setIsFormVisible(true)}
                >
                    Добавить задачу
                </Button>
            )}
        </div >
    );
}