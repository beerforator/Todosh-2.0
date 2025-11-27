import React from 'react';
import { DndContext, closestCenter, DragEndEvent, DragOverlay, useSensors, useSensor, PointerSensor, KeyboardSensor} from '@dnd-kit/core';
// import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Task } from '@/shared/types/entities';
import { TaskCard } from '@/entities/Task/ui/TaskCard';
import { MemoizedTaskCardWrapper } from '@/entities/Task/MemoizedTaskCardWrapper';

interface SortableListContainerProps {
    items: Task[],
    onDragEnd?: (event: DragEndEvent) => void,
    children: React.ReactNode,
    disabled?: boolean
}

const customModifier = ({ transform }: any) => {
  // Мы просто "обнуляем" движение по оси X
  return { ...transform, x: 0 };
};

export const SortableListContainer = (props: SortableListContainerProps) => {
    const { items, onDragEnd, children, disabled = false } = props;

    // console.log('SortableListContainer')

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
            // modifiers={[restrictToVerticalAxis]}
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

            {/* <DragOverlay>
                {items[0] ? (
                    // Рендерим нашу обычную карточку, но без D&D-атрибутов
                    // и с кастомными стилями (например, тенью)
                    // <MemoizedTaskCardWrapper
                    //     // key={task.id}
                    //     task={items[0]}
                    //     color={'#aaa'}
                    // />
                    <div style={{backgroundColor: '#2d1818'}}>

                    </div>
                ) : null}
            </DragOverlay> */}
        </DndContext>
    );
};