// src/entities/Task/ui/TaskCard.tsx
import React from 'react';
import { Task } from '@/shared/types/entities';
import { Card, CardContent, Typography, IconButton } from '@mui/material';
import StarBorder from '@mui/icons-material/StarBorder';
import Star from '@mui/icons-material/Star';

// Описываем, какие пропсы принимает наш компонент
interface TaskCardProps {
    task: Task;
    // "Слот" - это место, куда мы сможем вставить другую JSX-разметку.
    // Сюда мы позже вставим наш "умный" чекбокс из слоя features.
    featureSlot?: React.ReactNode;
    actionsSlot?: React.ReactNode;
}

export const TaskCard = ({ task, featureSlot, actionsSlot}: TaskCardProps) => {
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
            {featureSlot}

            <CardContent style={contentStyles}>
                {/* Если задача выполнена, перечеркиваем текст */}
                <Typography style={{ textDecoration: task.isCompleted ? 'line-through' : 'none' }}>
                    {task.title}
                </Typography>
            </CardContent>

            <IconButton>
                {task.isFavourite ? <Star color="primary" /> : <StarBorder />}
            </IconButton>

            {actionsSlot}
        </Card>
    );
};