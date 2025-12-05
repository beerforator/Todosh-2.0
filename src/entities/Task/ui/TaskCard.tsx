import React from 'react';

import { Task } from '@/shared/types/entities';
import { Typography } from '@mui/material';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { DataLogicFormatRender } from '../../../shared/ui/formatDateRender';

import styleT from '@/app/styles/MainContentStyles/TasksPage.module.scss'

interface TaskCardProps {
    task: Task,
    color?: string,
    isPanePersistent: boolean,
    editingTaskId: string,

    featureSlot?: React.ReactNode,
    actionsSlot?: React.ReactNode,
    hoverActionsSlot?: React.ReactNode,

    isDragging: boolean,
    dndAttributes?: DraggableAttributes,
    dndListeners?: SyntheticListenerMap | undefined,
    isHovered: boolean,
}

export const TaskCard = React.memo(({ task, color, featureSlot, actionsSlot, isDragging, hoverActionsSlot, dndAttributes, dndListeners, isHovered, isPanePersistent, editingTaskId }: TaskCardProps) => {
    return (
        <div className={isDragging
            ? (styleT.draggableTask + ' ' + styleT.taskCard_color_container)
            : (styleT.taskCard_color_container)
        }
            style={color === '#808080'
                ? editingTaskId === task.id ? { transform: 'scale(1.02)', backgroundColor: '#F1FAFF' } : { backgroundColor: '#F1FAFF' }
                : editingTaskId === task.id ? { transform: 'scale(1.02)', backgroundColor: color} : { backgroundColor: color }}

            // style={
            //     editingTaskId === task.id ? { transform: 'scale(1.02)' } : {}
            // }
        >
            <div
                className={'paperBlock ' + styleT.taskCard_container}
            >
                <div
                    className={task.isCompleted
                        ? (styleT.taskCard_isCompleted + ' ' + styleT.taskCard_stuff)
                        : (styleT.taskCard_stuff)}
                >
                    {featureSlot}

                    <div
                        className={styleT.taskCard_textContent}
                        {...dndAttributes}
                        {...dndListeners}
                    >
                        <TaskText
                            text={task.title}
                            isCompleted={task.isCompleted}
                            type='title'
                        />

                        <div className={styleT.cardTextDivider}></div>

                        {!isPanePersistent &&
                            <TaskText
                                text={task.description}
                                isCompleted={task.isCompleted}
                                type='description'
                            />
                        }

                        {!isPanePersistent &&
                            <div className={styleT.cardTextDivider}></div>
                        }

                        <DataLogicFormatRender startDate={task.startDate} endDate={task.endDate} />

                    </div>
                    <div
                        // className={isHovered
                        //     ? styleT.actions
                        //     : (styleT.actions + ' ' + styleT.unhovered_actions)
                        // }
                        className={styleT.actions}
                    >
                        {isHovered && hoverActionsSlot}
                        {/* {hoverActionsSlot} */}
                        {actionsSlot}
                    </div>
                </div>
            </div>
        </div>
    );
})

interface TaskTitleProps {
    text?: string,
    isCompleted: boolean,
    type?: 'description' | 'title'
    // variant?: "body1" | "body2"
}

export const TaskText = (props: TaskTitleProps) => {
    const { text, isCompleted, type } = props

    return (
        <Typography
            className={styleT.cardItemText}
            style={type === 'title' ? { maxWidth: '250px' } : { maxWidth: '330px', fontSize: '10px' }}
        >
            {text ? text : ''}
        </Typography>
    )
}