import React from 'react';
import { Task } from '@/shared/types/entities';
import { Card, CardContent, Typography } from '@mui/material';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { DataLogicFormatRender } from '../../../shared/lib/formatDateRender';

interface TaskCardProps {
    task: Task,
    featureSlot?: React.ReactNode,
    actionsSlot?: React.ReactNode,
    hoverActionsSlot?: React.ReactNode,
    dndAttributes: DraggableAttributes,
    dndListeners: SyntheticListenerMap | undefined,
    isHovered: boolean
}

export const TaskCard = React.memo(({ task, featureSlot, actionsSlot, hoverActionsSlot, dndAttributes, dndListeners, isHovered }: TaskCardProps) => {
    const cardStyles: React.CSSProperties = {
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 10px',
        opacity: task.isCompleted ? 0.5 : 1,
    };

    const contentStyles: React.CSSProperties = {
        flexGrow: 1,
    };



    return (
        <Card
            style={cardStyles}

        >
            {featureSlot}

            <CardContent
                style={contentStyles}
                {...dndAttributes}
                {...dndListeners}
            >
                <TaskTitle
                    title={task.title}
                    isCompleted={task.isCompleted}
                    variant="body1"
                />

                <DataLogicFormatRender startDate={task.startDate} endDate={task.endDate} />

            </CardContent>

            {isHovered && hoverActionsSlot}
            {actionsSlot}

        </Card>
    );
})

interface TaskTitleProps {
    title: string,
    isCompleted: boolean,
    variant?: "body1" | "body2"
}

export const TaskTitle = (props: TaskTitleProps) => {
    const { title, isCompleted, variant } = props

    return (
        <Typography
            variant={variant}
            sx={{
                ml: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                textDecoration: isCompleted ? 'line-through' : 'none',
                opacity: isCompleted ? 0.6 : 1,
                flexGrow: 1
            }}
        >
            {title}
        </Typography>
    )
}