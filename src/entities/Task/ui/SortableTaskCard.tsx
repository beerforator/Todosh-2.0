// src/entities/Task/ui/SortableTaskCard.tsx
import React from 'react';
import { Task } from '@/shared/types/entities';
import { useSortable } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';

// Описываем, какие пропсы принимает наш компонент
interface SortableTaskCardProps {
    task: Task;
    // "Слот" - это место, куда мы сможем вставить другую JSX-разметку.
    // Сюда мы позже вставим наш "умный" чекбокс из слоя features.
    featureSlot?: React.ReactNode;
    actionsSlot?: React.ReactNode;
}

export const SortableTaskCard = ({ task, ...props }: SortableTaskCardProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: task.id });

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
        transition,
    };

    return (
        // Мы "оборачиваем" нашу TaskCard в div, к которому применяем все магические атрибуты
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TaskCard task={task} {...props} />
        </div>
    );
};