import { AppDispatch } from "@/app/providers/store/types"
import { Task } from "@/shared/types/entities"
import { Checkbox, CircularProgress, IconButton } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateTaskApi } from "../EditTask/api/updateTaskApi"
import Star from "@mui/icons-material/Star"
import StarBorder from "@mui/icons-material/StarBorder"

interface ToggleFavouriteCalendarProps {
    task: Task
}

export const ToggleFavouritCalendar = ({ task }: ToggleFavouriteCalendarProps) => {
    const dispatch: AppDispatch = useDispatch()
    // const [isLoading, setIsLoading] = useState(false)

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation()

        // if (!task || isLoading) return

        // setIsLoading(true)

        // try {
        //     await dispatch(updateTaskApi({
        //         taskId: task.id,
        //         changes: { isCompleted: !task.isCompleted }
        //     })).unwrap()
        // }
        // catch (error) {
        //     console.error(`Failed to toggle task in calendar with error: ${error}`)
        // }
        // finally {
        //     setIsLoading(false)
        // }

        dispatch(updateTaskApi({
            taskId: task.id,
            changes: { isFavourite: !task.isFavourite }
        }))
    }

    // if (isLoading) {
    //     return <CircularProgress size={28} sx={{ p: '4px' }} />;
    // }

    return (
        <IconButton
            size="small"
            onClick={handleToggle}
            onMouseDown={(e) => e.stopPropagation()}
            sx={{ p: '4px' }}
        >
            {task.isFavourite ? <Star fontSize="inherit" color="primary" /> : <StarBorder fontSize="inherit" />}
        </ IconButton>

    )
}