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
import styleT from '@/app/styles/MainContentStyles/TasksPage.module.scss'

import { TaskText } from "@/entities/Task/ui/TaskCard"
import { AddPlusIcon } from "@/shared/ui/Icons/SidebarIcons"
import { useEmptyRows } from "@/shared/hooks/useEmptyRows"
import { EmptyTaskRow } from "@/shared/ui/EmptyRows/EmptyRow"
import { SortableListContainer } from "./SortableListContainer"

interface ScrollableViewProps {
    viewType: string;
    tasksContainerRef: RefObject<HTMLElement | null>,

    tasksArray?: Task[],
    groupedTasks?: Record<string, { listName: string; tasks: Task[]; }>,

    isDndEnabled: boolean,
    handleDragEnd?: (event: DragEndEvent) => void,
    selectedListId: string,
    isPanePersistent: boolean
}

export const ScrollableView = React.memo(({ viewType, tasksContainerRef, tasksArray, groupedTasks, isDndEnabled, handleDragEnd, selectedListId, isPanePersistent }: ScrollableViewProps) => {
    let tasksInList = 1000

    if (viewType === "list" && !!tasksArray) {
        tasksInList = tasksArray.length
    }
    else if (viewType === "grouped" && !!groupedTasks) {
        tasksInList = 1000
    }

    const emptyRows = useEmptyRows(tasksContainerRef, tasksInList);

    return (
        <>
            {(viewType === "list" && !!tasksArray) &&
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
                            <MemoizedTaskCardWrapper
                                key={task.id}
                                task={task}
                                isPanePersistent={isPanePersistent}
                            />
                        ))}
                    </SortableListContainer>
                </div>
            }

            {(viewType === "grouped" && !!groupedTasks) &&
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
})