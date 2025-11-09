import CircleIcon from '@mui/icons-material/Circle';

interface ListCircleIconProps {
    color: string
}

export const ListCircleIcon = ({ color }: ListCircleIconProps) => {
    return (
        <CircleIcon fontSize="small" sx={{ color: color }} />
    )
}