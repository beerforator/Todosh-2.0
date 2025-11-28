import React from 'react';
import { DndContext, closestCenter, DragEndEvent, useSensors, useSensor, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '@/shared/types/entities';

const customModifier = ({ transform }: any) => {
    return { ...transform, x: 0 };
};

interface SortableListContainerProps {
    items: Task[],
    onDragEnd?: (event: DragEndEvent) => void,
    children: React.ReactNode,
    disabled?: boolean
}

export const SortableListContainer = (props: SortableListContainerProps) => {
    const { items, onDragEnd, children, disabled = false } = props;


    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor)
    );

    if (disabled) {
        return <>{children}</>;
    }

    return (
        <DndContext
            sensors={sensors}
            modifiers={[customModifier]}
            collisionDetection={closestCenter}
            onDragEnd={onDragEnd}
        >
            <SortableContext
                items={items.map(t => t.id)}
                strategy={verticalListSortingStrategy}
            >
                {children}
            </SortableContext>
        </DndContext>
    );
};