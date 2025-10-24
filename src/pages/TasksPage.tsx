import { AppDispatch, RootState } from "@/app/providers/store/types"
import { fetchTasks } from "@/entities/Task/model/fetchTasks"
import { reOrderTask, tasksSelectors } from "@/entities/Task/model/tasksSlice"
import { CreateTaskButton, TaskModal } from "@/features/TaskModal/TaskModal"
import { DeleteTask } from "@/features/DeleteTask/DeleteTask"
import { ToggleTask } from "@/features/ToggleTask/ToggleTask"
import { Task } from "@/shared/types/entities"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { SortableTaskCard } from '@/entities/Task/ui/SortableTaskCard';
import { IconButton } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';

export const TasksPage = () => {
    const dispatch: AppDispatch = useDispatch()
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId)
    // Пока просим все задачи
    const allTasks: Task[] = useSelector(tasksSelectors.selectAll)
    const filteredTasks = allTasks.filter(task => {
        // all tasks
        if (selectedListId === 'all')
            return task
        else
            return task.listOwnerId === selectedListId
    })
    const tasksLoadingStatus = useSelector((state: RootState) => state.tasks.loading)

    // const [modalTask, setModalTask] = useState<Task | null>(null)
    // const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

    const [modalState, setModalState] = useState<'closed' | 'create' | Task>('closed');

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

    // const handleOpenEditModal = (task: Task) => {
    //     setModalTask(task);
    // };

    const handleCloseModal = () => {
        setModalState('closed');
    };

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
                                actionsSlot={
                                    <>
                                        <IconButton onClick={() => setModalState(task)}>
                                            <EditIcon />
                                        </IconButton>
                                        <DeleteTask taskId={task.id} />
                                    </>
                                }
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>
            <CreateTaskButton onClick={() => setModalState('create')} />
            {/* 4. Рендерим модальное окно по условию */}
            {modalState !== 'closed' && (
                <TaskModal
                    // Если стейт - это объект, передаем его. Иначе - null.
                    taskToEdit={typeof modalState === 'object' ? modalState : null}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    )
}