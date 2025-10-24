// src/entities/Task/ui/TaskCard.tsx
import React from 'react';
import { Task } from '@/shared/types/entities';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import StarBorder from '@mui/icons-material/StarBorder';
import Star from '@mui/icons-material/Star';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';

// Описываем, какие пропсы принимает наш компонент
interface TaskCardProps {
    task: Task,
    // "Слот" - это место, куда мы сможем вставить другую JSX-разметку.
    // Сюда мы позже вставим наш "умный" чекбокс из слоя features.
    featureSlot?: React.ReactNode,
    actionsSlot?: React.ReactNode,
    dndAttributes: DraggableAttributes,
    dndListeners: SyntheticListenerMap | undefined
}

export const TaskCard = ({ task, featureSlot, actionsSlot, dndAttributes, dndListeners }: TaskCardProps) => {
    const formatDate = (date: Date | undefined) => {
        if (!date) return null;
        // new Date(date) - на случай, если дата пришла как строка
        // .toLocaleDateString() - превратит дату в "16.10.2025" с учетом твоего часового пояса
        return new Date(date).toLocaleDateString();
    };

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
        <Card style={cardStyles}>
            {/* Рендерим здесь наш "слот" с фичей (чекбоксом) */}
            {/* 2. Кнопки и чекбоксы теперь находятся ВНЕ зоны действия dndListeners */}
            {featureSlot}

            {/* 3. Оборачиваем контент в div, который и будет нашей "ручкой".
            Именно за него мы будем "хватать" карточку для перетаскивания. */}

            <CardContent style={contentStyles} {...dndAttributes} {...dndListeners}>
                {/* Если задача выполнена, перечеркиваем текст */}
                <Typography style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                    {task.title}
                </Typography>
                {/* all tasks data */}
                {(task.startDate || task.endDate) && (
                    <Typography variant="body2" color="text.secondary">
                        {formatDate(task.startDate)}
                        {task.endDate && ` - ${formatDate(task.endDate)}`}
                    </Typography>
                )}
            </CardContent>

            {/* 4. Все кнопки действий теперь тоже вне зоны dndListeners */}
            <IconButton>
                {task.isFavourite ? <Star color="primary" /> : <StarBorder />}
            </IconButton>

            {actionsSlot}
        </Card>
    );
};