import { AppDispatch, RootState } from "@/app/providers/store/types"
import { fetchTasks } from "@/entities/Task/model/fetchTasks"
import { tasksSelectors } from "@/entities/Task/model/tasksSlice"
import { Task } from "@/shared/types/entities"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export const TasksPage = () => {
    const dispatch: AppDispatch = useDispatch()

    const allTasks: Task[] = useSelector(tasksSelectors.selectAll)

    const tasksLoadingStatus = useSelector((state: RootState) => state.tasks.loading)

    useEffect(() => {
        dispatch(fetchTasks())
    }, [dispatch])

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
                        <li key={task.id}>{task.title}</li>
                    ))
                }
            </ul>
        </div>
    )
}