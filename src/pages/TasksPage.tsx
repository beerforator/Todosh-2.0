import { AppDispatch, RootState } from "@/app/providers/store/types"
import { fetchTasks } from "@/entities/Task/model/fetchTasks"
import { reOrderTask, tasksSelectors } from "@/entities/Task/model/tasksSlice"
import { CreateTask } from "@/features/CreateTask/CreateTask"
import { DeleteTask } from "@/features/DeleteTask/DeleteTask"
import { ToggleTask } from "@/features/ToggleTask/ToggleTask"
import { Task } from "@/shared/types/entities"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { SortableTaskCard } from '@/entities/Task/ui/SortableTaskCard';

export const TasksPage = () => {
    const dispatch: AppDispatch = useDispatch()
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId)
    // Пока просим все задачи
    const allTasks: Task[] = useSelector(tasksSelectors.selectAll)
    const filteredTasks = allTasks.filter(task => task.listOwnerId === selectedListId)
    const tasksLoadingStatus = useSelector((state: RootState) => state.tasks.loading)

    useEffect(() => {
        if (tasksLoadingStatus === 'idle') {
            dispatch(fetchTasks())
        }
    }, [tasksLoadingStatus, dispatch])

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        if (over && active.id !== over.id) {
            dispatch(reOrderTask({
                fromId: active.id as string,
                toId: over.id as string
            }))
        }
    }

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

    const filteredTaskIds = filteredTasks.map(task => task.id)

    return (
        <div>
            <h1>Tasks page</h1>
            <h2>Тут потом будет название листа</h2>
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
                {/* 7. Внутри оборачиваем в SortableContext, передавая ему массив ID */}
                <SortableContext items={filteredTaskIds} strategy={verticalListSortingStrategy} >
                    <div>
                        {/* 8. Рендерим отфильтрованный список, но используем SortableTaskCard */}
                        {filteredTasks.map((task) => (
                            <SortableTaskCard
                                key={task.id}
                                task={task}
                                featureSlot={<ToggleTask task={task} />}
                                actionsSlot={<DeleteTask taskId={task.id} />}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
            <CreateTask />
        </div>
    )
}