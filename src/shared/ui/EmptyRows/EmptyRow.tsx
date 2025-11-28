// src/shared/ui/EmptyTaskRow/EmptyTaskRow.tsx
import React from 'react';
import { Box, Card } from '@mui/material';

import styleT from '@/app/styles/MainContentStyles/TasksPage.module.scss'

// Примерная высота одной карточки задачи. Мы можем вынести это в тему.
const TASK_ROW_HEIGHT = 58;

interface EmptTaskRow {
    isPanePersistent: boolean
}

export const EmptyTaskRow = React.memo(({ isPanePersistent }: EmptTaskRow) => {
    return (
        <div
            className={isPanePersistent
                ? (styleT.emptyLineContainer + ' ' + styleT.collapsed)
                : (styleT.emptyLineContainer)}
        >
            <div
                className={styleT.emptyLineEffect}
            ></div>
        </div>
        // <Card sx={{
        //     height: TASK_ROW_HEIGHT,
        //     width: '100%',
        //     display: 'flex',
        //     alignItems: 'center',
        //     p: 2,
        //     opacity: 0.5,
        //     border: '1px dashed #ccc',
        //     boxShadow: 'none',
        //     marginBottom: '10px' // Такой же отступ, как у TaskCard
        // }}>
        //     a{/* Можно добавить иконку или текст, если нужно */}
        // </Card>
    );
})