import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { Task } from '@/shared/types/entities';
import { useSortable } from '@dnd-kit/sortable';
import { TaskCard } from './ui/TaskCard';
import { RootState } from '@/app/providers/store/types';
import { listsSelectors } from '@/app/providers/store/slices/listsSlice';

interface SortableTaskCardProps {
    task: Task,
    isPanePersistent: boolean,

    featureSlot: React.ReactNode,
    actionsSlot: React.ReactNode,
    hoverActionsSlot: React.ReactNode
}

export const SortableTaskCard = React.memo(({ task, isPanePersistent, featureSlot, actionsSlot, hoverActionsSlot }: SortableTaskCardProps) => {
    const selectedList = useSelector((state: RootState) =>
        task.listOwnerId ? listsSelectors.selectById(state, task.listOwnerId) : undefined
    );

    const { editingTaskId, detailsPaneMode } = useSelector((state: RootState) => state.uiReducer);

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true)
    }, [])

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false)
    }, [])

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id: task.id });

    const style = {
        // transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        // transform: CSS.Translate.toString(transform),
        transition,
        // opacity: isDragging ? 0 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}

            style={style} // !!!
        >
            <TaskCard
                task={task}
                color={selectedList?.color}
                isPanePersistent={isPanePersistent}
                editingTaskId={editingTaskId}
                
                featureSlot={featureSlot}
                actionsSlot={actionsSlot}
                hoverActionsSlot={hoverActionsSlot}

                isDragging={isDragging}
                dndAttributes={attributes}
                dndListeners={listeners}
                isHovered={isHovered}
            />
        </div>
    );
})