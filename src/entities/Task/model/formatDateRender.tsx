import { Card, CardContent, Typography, IconButton } from '@mui/material';

const formatDate = (date: Date | undefined) => {
    if (!date) return null;
    // new Date(date) - на случай, если дата пришла как строка
    // .toLocaleDateString() - превратит дату в "16.10.2025" с учетом твоего часового пояса
    return new Date(date).toLocaleDateString();
};

type dataLogicFormatRenderArg = Date | null | undefined

export const dataLogicFormatRender = (startDate: dataLogicFormatRenderArg, endDate: dataLogicFormatRenderArg) => {
    if (!startDate || !endDate) return

    let d1 = new Date(startDate)
    let d2 = new Date(endDate)

    d2.setDate(d2.getDate() - 1)

    let ddd1 = d1.toString().slice(0, 15)
    let ddd2 = d2.toString().slice(0, 15)

    return (
        <Typography variant="body2" color="text.secondary" >
            {formatDate(d1)}
            {ddd1 !== ddd2 && ` - ${formatDate(d2)}`}
        </Typography>
    )

}