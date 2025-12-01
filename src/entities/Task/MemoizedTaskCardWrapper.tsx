import React from "react";
import { useMemo } from "react";

import { DeleteTaskContainer } from "@/features/DeleteTask/DeleteTaskContainer";
import { ToggleEditPaneContainer } from "@/features/EditTask/ToggleEditPaneContainer";
import { ToggleFavouriteContainer } from "@/features/ToggleFavourite/ToggleFavouriteContainer";
import { ToggleTaskContainer } from "@/features/ToggleTask/ToggleTaskContainer";
import { Task } from "@/shared/types/entities";
import { SetTaskTodayContainer } from "@/features/SetTaskToday/SetTaskTodayContainer";
import { SortableTaskCard } from "./SortableTaskCard";

interface MemoizedTaskCardWrapperProps {
    task: Task,
    isPanePersistent: boolean
}

export const MemoizedTaskCardWrapper = React.memo(({ task, isPanePersistent }: MemoizedTaskCardWrapperProps) => {
    const featureSlot = useMemo(() => (
        <>
            <ToggleTaskContainer taskId={task.id} />
        </>
    ), [task.id]);

    const actionsSlot = useMemo(() => (
        <>
            <ToggleFavouriteContainer taskId={task.id} />
            <DeleteTaskContainer taskId={task.id} />
        </>
    ), [task.id]);

    const hoverActionsSlot = useMemo(() => (
        <>
            <ToggleEditPaneContainer taskId={task.id} mode='persistent' />
            <SetTaskTodayContainer taskId={task.id} />
        </>
    ), [task.id]);

    return (
        <SortableTaskCard
            task={task}
            isPanePersistent={isPanePersistent}

            featureSlot={featureSlot}
            actionsSlot={actionsSlot}
            hoverActionsSlot={hoverActionsSlot}
        />
    );
});