import CircleIcon from '@mui/icons-material/Circle';
import style from '@/app/styles/IconStyles.module.scss'

interface ListCircleIconProps {
    color: string
}

export const ListCircleIcon = ({ color }: ListCircleIconProps) => {
    return (
        <div className={style.filterCircle_container}>
            <div className={style.filterCircleStyle + ' ' + style.allIconStyle} style={{ backgroundColor: color }} ></div>
        </div>
    )
}