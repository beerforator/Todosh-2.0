// src/entities/Task/ui/TaskCard.tsx
import React, { useState } from 'react';
import { Task } from '@/shared/types/entities';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { dataLogicFormatRender } from '../model/formatDateRender';

// Описываем, какие пропсы принимает наш компонент
interface TaskCardProps {
    task: Task,
    // "Слот" - это место, куда мы сможем вставить другую JSX-разметку.
    // Сюда мы позже вставим наш "умный" чекбокс из слоя features.
    featureSlot?: React.ReactNode,
    actionsSlot?: React.ReactNode,
    hoverActionsSlot?: React.ReactNode,
    dndAttributes: DraggableAttributes,
    dndListeners: SyntheticListenerMap | undefined
}

export const TaskCard = ({ task, featureSlot, actionsSlot, hoverActionsSlot, dndAttributes, dndListeners }: TaskCardProps) => {
    const [isHovered, setIsHovered] = useState(false);

    

    const cardStyles: React.CSSProperties = {
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        // Если задача выполнена, делаем ее полупрозрачной
        opacity: task.isCompleted ? 0.5 : 1,
    };

    const contentStyles: React.CSSProperties = {
        flexGrow: 1, // Занимает все доступное пространство
    };

    

    return (
        <Card
            style={cardStyles}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Рендерим здесь наш "слот" с фичей (чекбоксом) */}
            {/* 2. Кнопки и чекбоксы теперь находятся ВНЕ зоны действия dndListeners */}
            {featureSlot}

            {/* 3. Оборачиваем контент в div, который и будет нашей "ручкой".
            Именно за него мы будем "хватать" карточку для перетаскивания. */}

            <CardContent
                style={contentStyles}
                {...dndAttributes}
                {...dndListeners}
            >
                {/* Если задача выполнена, перечеркиваем текст */}
                <Typography style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                    {task.title}
                </Typography>
                {/* all tasks data */}
                {dataLogicFormatRender(task.startDate, task.endDate)}
            </CardContent>

            {isHovered && hoverActionsSlot}
            {actionsSlot}

        </Card>
    );
};