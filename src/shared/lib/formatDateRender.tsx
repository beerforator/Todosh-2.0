import React from 'react';

import { Typography } from '@mui/material';

import styleT from '@/app/styles/MainContentStyles/TasksPage.module.scss'

const formatDate = (date: Date | undefined) => {
    if (!date) return null;
    return new Date(date).toLocaleDateString();
};

interface dataLogicFormatRenderArg {
    startDate: Date | null | undefined,
    endDate: Date | null | undefined
}

export const DataLogicFormatRender = React.memo(({ startDate, endDate }: dataLogicFormatRenderArg) => {
    if (!startDate || !endDate) return (
        <Typography variant="body2" color="text.secondary" className={styleT.cardDate}>
            -
        </Typography>
    )

    let d1 = new Date(startDate)
    let d2 = new Date(endDate)

    d2.setDate(d2.getDate() - 1)

    let ddd1 = d1.toString().slice(0, 15)
    let ddd2 = d2.toString().slice(0, 15)

    return (
        <Typography variant="body2" color="text.secondary" className={styleT.cardDate}>
            {formatDate(d1)}
            {ddd1 !== ddd2 && ` - ${formatDate(d2)}`}
        </Typography>
    )
})