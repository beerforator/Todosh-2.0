import React from "react";
import { useMemo } from "react";

import { DeleteTaskContainer } from "@/features/DeleteTask/DeleteTaskContainer";
import { ToggleEditPaneContainer } from "@/features/EditTask/ToggleEditPaneContainer";
import { ToggleFavouriteContainer } from "@/features/ToggleFavourite/ToggleFavouriteContainer";
import { ToggleTaskContainer } from "@/features/ToggleTask/ToggleTaskContainer";
import { Task } from "@/shared/types/entities";
import { SetTaskTodayContainer } from "@/features/SetTaskToday/SetTaskTodayContainer";
import { SortableTaskCard } from "./SortableTaskCard";
import { isToday } from "@/shared/lib/dataFunctions";

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
            {
                isToday(task.startDate, task.endDate) &&
                <SetTaskTodayContainer taskId={task.id} disabled={true} />
            }
            <ToggleFavouriteContainer taskId={task.id} />
            <DeleteTaskContainer taskId={task.id} />
        </>
    ), [task.id, task.startDate, task.endDate]);

    const hoverActionsSlot = useMemo(() => (
        <>
            <ToggleEditPaneContainer taskId={task.id} mode='persistent' />
            {
                !isToday(task.startDate, task.endDate) &&
                <SetTaskTodayContainer taskId={task.id} />
            }
        </>
    ), [task.id, task.startDate, task.endDate]);

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