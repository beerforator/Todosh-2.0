import { AppDispatch } from "@/app/providers/store/types"
import { Task } from "@/shared/types/entities"
import { Checkbox, CircularProgress } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateTaskApi } from "../EditTask/api/updateTaskApi"

interface ToggleTaskCalendarProps {
    task: Task
}

export const ToggleTaskCalendar = ({ task }: ToggleTaskCalendarProps) => {
    const dispatch: AppDispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    const handleToggle = async (e: React.MouseEvent) => {
        e.stopPropagation()

        if (!task || isLoading) return 
        
        setIsLoading(true)

        try {
            await dispatch(updateTaskApi({
                taskId: task.id,
                changes: {isCompleted: !task.isCompleted}
            })).unwrap()
        }
        catch (error){
            console.error(`Failed to toggle task in calendar with error: ${error}`)
        }
        finally {
            setIsLoading(false)
        }
    
    }

    if (isLoading) {
        return <CircularProgress size={28} sx={{ p: '4px' }} />;
    }
    return (
        <Checkbox
            size="small"
            checked={task.isCompleted}
            onClick={handleToggle}
            onMouseDown={(e) => e.stopPropagation()}
            sx={{ p: '4px' }}
        />
    )
}