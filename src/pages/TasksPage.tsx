import { AppDispatch, RootState } from "@/app/providers/store/types"
import { fetchTasks } from "@/entities/Task/model/fetchTasks"
import { tasksSelectors } from "@/entities/Task/model/tasksSlice"
import { TaskCard } from "@/entities/Task/ui/TaskCard"
import { CreateTask } from "@/features/CreateTask/CreateTask"
import { DeleteTask } from "@/features/DeleteTask/DeleteTask"
import { ToggleTask } from "@/features/ToggleTask/ToggleTask"
import { Task } from "@/shared/types/entities"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const TasksPage = () => {
    const dispatch: AppDispatch = useDispatch()

    const allTasks: Task[] = useSelector(tasksSelectors.selectAll)

    const tasksLoadingStatus = useSelector((state: RootState) => state.tasks.loading)

    useEffect(() => {
        if (tasksLoadingStatus === 'idle') {
            dispatch(fetchTasks())
        }
    }, [tasksLoadingStatus, dispatch])

    if (tasksLoadingStatus === 'pending') {
        return (
            <h2>Loading ...</h2>
        )
    }

    if (tasksLoadingStatus === 'failed') {
        return (
            <h2>Failed to get tasks</h2>
        )
    }

    return (
        <div>
            <h1>Tasks page</h1>
            <ul>
                {
                    allTasks.map(task => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            featureSlot={<ToggleTask task={task} />}
                            actionsSlot={<DeleteTask taskId={task.id} />}
                        />
                    ))
                }
            </ul>
            <CreateTask />
        </div>
    )
}