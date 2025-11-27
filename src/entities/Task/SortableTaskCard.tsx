// src/entities/Task/ui/SortableTaskCard.tsx
import React, { useCallback, useState } from 'react';
import { Task } from '@/shared/types/entities';
import { useSortable } from '@dnd-kit/sortable';
import { TaskCard } from './ui/TaskCard';
import { RootState } from '@/app/providers/store/types';
import { useSelector } from 'react-redux';
import { listsSelectors } from '@/app/providers/store/slices/listsSlice';

// Описываем, какие пропсы принимает наш компонент
interface SortableTaskCardProps {
    task: Task;
    color?: string;
    // "Слот" - это место, куда мы сможем вставить другую JSX-разметку.
    // Сюда мы позже вставим наш "умный" чекбокс из слоя features.
    featureSlot?: React.ReactNode;
    actionsSlot?: React.ReactNode;
    hoverActionsSlot?: React.ReactNode;
    isPanePersistent: boolean
}

export const SortableTaskCard = React.memo(({ task, color, ...props }: SortableTaskCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    const selectedList = useSelector((state: RootState) =>
        task.listOwnerId ? listsSelectors.selectById(state, task.listOwnerId) : undefined
    );

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

    const placeholderStyle: React.CSSProperties = {
        backgroundColor: '#e0e0e0',
        border: '1px dashed #999',
        opacity: 0.6,
    };

    return (
        // Мы "оборачиваем" нашу TaskCard в div, к которому применяем все магические атрибуты
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <TaskCard task={task} color={selectedList?.color} isDragging={isDragging}{...props} dndAttributes={attributes} dndListeners={listeners} isHovered={isHovered} />
        </div>
    );
})