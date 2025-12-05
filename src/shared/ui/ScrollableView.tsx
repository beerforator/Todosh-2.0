import { Task } from "@/shared/types/entities"
import { RefObject } from "react"

import { DragEndEvent } from '@dnd-kit/core';

import { Typography } from "@mui/material"
import React from "react"
import { MemoizedTaskCardWrapper } from "@/entities/Task/MemoizedTaskCardWrapper"

import styleT from '@/app/styles/MainContentStyles/TasksPage.module.scss'

import { useEmptyRows } from "@/shared/hooks/useEmptyRows"
import { EmptyTaskRow } from "@/shared/ui/EmptyRows/EmptyRow"
import { ListView } from "@/pages/TasksPage";
import { SortableListContainer } from "./SortableListContainer";

interface ScrollableViewProps {
    viewType: string;
    tasksContainerRef: RefObject<HTMLElement | null>,

    tasksArray?: Task[],
    groupedTasks?: ListView[],

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
                    {groupedTasks.map((group) => (
                        <div
                            key={group.listName}
                            className={!isPanePersistent
                                ? (styleT.tagView)
                                : (styleT.tagView + ' ' + styleT.collapsed)}
                        >
                            <Typography variant="h5" gutterBottom>{group.listName}</Typography>
                            {group.content.map((task: Task) => (
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