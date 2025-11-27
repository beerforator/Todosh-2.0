import { AppDispatch, RootState } from "@/app/providers/store/types"
import { fetchTasksApi } from "@/app/services/taskServices/fetchTasksApi"
import { List, Task } from "@/shared/types/entities"
import { RefObject, useCallback, useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { Box, Button, ListItemIcon, Typography } from "@mui/material"
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



import style from '@/app/styles/IconStyles.module.scss'
import styleT from '@/app/styles/TasksPage.module.scss'
import { TaskText } from "@/entities/Task/ui/TaskCard"
import { AddPlusIcon } from "@/shared/ui/Icons/SidebarIcons"
import { useEmptyRows } from "@/shared/hooks/useEmptyRows"
import { EmptyTaskRow } from "@/shared/ui/EmptyRows/EmptyRow"
import { SortableListContainer } from "./SortableListContainer"

interface ScrollableViewProps {
    tasksContainerRef: RefObject<HTMLElement | null>,
    tasksArray: Task[],
    groupedTasks?: Record<string, { listName: string; tasks: Task[]; }>,
    isDndEnabled: boolean,
    handleDragEnd?: (event: DragEndEvent) => void,
    selectedListId: string,
    isPanePersistent: boolean
}

export const ScrollableView = ({ tasksContainerRef, tasksArray, groupedTasks, isDndEnabled, handleDragEnd, selectedListId, isPanePersistent }: ScrollableViewProps) => {
    console.log('ScrollableView')

    let tasksInList = !!groupedTasks ? 1000 : tasksArray.length

    // const tasksContainerRef = useRef<HTMLDivElement>(null);
    const emptyRows = useEmptyRows(tasksContainerRef, tasksInList); //filteredAndSortedTasks.length

    console.log(emptyRows)

    return (
        <>
            {!groupedTasks &&
                <div
                    className={!isPanePersistent
                        ? (styleT.tagView)
                        : (styleT.tagView + ' ' + styleT.collapsed)}
                >
                    <SortableListContainer
                        items={tasksArray}
                        onDragEnd={handleDragEnd}
                        disabled={!isDndEnabled}
                    >
                        {tasksArray.map(task => (
                            // renderSortableTaskCard(task)
                            <MemoizedTaskCardWrapper
                                key={task.id}
                                task={task}
                                color={selectedListId}
                                isPanePersistent={isPanePersistent}
                            />
                        ))}
                    </SortableListContainer>
                </div>
            }

            {!!groupedTasks &&
                <>
                    {Object.values(groupedTasks).map(({ listName, tasks }) => (
                        <div
                            key={listName}
                            className={!isPanePersistent
                                ? (styleT.tagView)
                                : (styleT.tagView + ' ' + styleT.collapsed)}
                        >
                            <Typography variant="h5" gutterBottom>{listName}</Typography>
                            {tasks.map((task: Task) => (
                                <MemoizedTaskCardWrapper
                                    key={task.id}
                                    task={task}
                                    color={selectedListId}
                                    isPanePersistent={isPanePersistent}
                                />
                            ))}
                        </div>
                    ))}
                </>
            }

            {Array.from({ length: emptyRows }).map((_, index) => (
                <EmptyTaskRow key={`empty-${index}`} isPanePersistent={isPanePersistent} />
            ))}
        </>
    );
}

{/* <>
    <div className={styleT.tagView}>
        <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={filteredAndSortedTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                {filteredAndSortedTasks.map(task => (
                    renderSortableTaskCard(task)
                ))}
            </SortableContext>
        </DndContext>
    </div>
</> */}

{/* <>
    <div className={styleT.tagView}>
        {tasksToRender.map(task => (
            renderSortableTaskCard(task)
        ))}
    </div>
</> */}

{/* <>
    {Object.values(groupedTasks).map(({ listName, tasks }) => (
        <div key={listName} className={styleT.tagView}>
            <Typography variant="h5" gutterBottom>{listName}</Typography>
            {tasks.map(task => (
                renderSortableTaskCard(task)
            ))}
        </div>
    ))}
</> */}