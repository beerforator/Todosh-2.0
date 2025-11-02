import { AppDispatch, RootState } from "@/app/providers/store/types"
import { fetchTasks } from "@/entities/Task/model/fetchTasks"
import { reOrderTask, tasksSelectors } from "@/entities/Task/model/tasksSlice"
import { CreateTaskButton, TaskModal } from "@/features/TaskModal/CalendarCreateModal"
import { DeleteTask } from "@/features/DeleteTask/DeleteTask"
import { ToggleTask } from "@/features/ToggleTask/ToggleTask"
import { List, Task } from "@/shared/types/entities"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

import { SortableTaskCard } from '@/entities/Task/ui/SortableTaskCard';
import { Box, Button, IconButton, ListItemIcon, Typography } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { startEditingTask } from "@/widgets/UISlice/UISlice"
import { InlineCreateTask } from "@/features/InlineCreateTask/InlineCreateTask"
import AddIcon from '@mui/icons-material/Add';
import { ALL_TASKS_LIST_ID, listsSelectors, TODAY_TASKS_LIST_ID } from "@/entities/List/model/listsSlice"
import CircleIcon from '@mui/icons-material/Circle'; // Для иконок списков
import { ToggleFavourite } from "@/features/ToggleFavourite/ToggleFavourite"
import { SetTaskToday } from "@/features/SetTaskToday/SetTaskToday"
import { updateTaskApi } from "@/features/EditTask/api/updateTaskApi"
import { ListHeader } from "@/widgets/ListHeader/ListHeader"

export const TasksPage = () => {
    const dispatch: AppDispatch = useDispatch()
    // ЧТО БУДЕТ ЕСЛИ АЙДИ ВЫБРАННОГО ТЭГА НЕ УСЕЕТ ДОЙТИ ?!
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId)
    const tasksLoadingStatus = useSelector((state: RootState) => state.tasks.loading)
    const [isFormVisible, setIsFormVisible] = useState(false);

    const allTasks: Task[] = useSelector(tasksSelectors.selectAll)
    const allLists: List[] = useSelector(listsSelectors.selectAll);

    useEffect(() => {
        if (tasksLoadingStatus === 'idle') {
            dispatch(fetchTasks())
        }
    }, [tasksLoadingStatus, dispatch])

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event

        const currentTasks = allTasks
            .filter(task => task.listOwnerId === selectedListId)
            .slice()
            .sort((a, b) => a.order - b.order);

        if (over && active.id !== over.id) {
            // Находим старый и новый индекс элемента в отсортированном списке
            const oldIndex = currentTasks.findIndex(t => t.id === active.id);
            const newIndex = currentTasks.findIndex(t => t.id === over.id);

            // --- ЛОГИКА ВЫЧИСЛЕНИЯ НОВОГО `order` ---
            let newOrder: number;

            // Случай 1: Перетащили в самый верх
            if (newIndex === 0) {
                newOrder = currentTasks[0].order - 10; // Берем order первого элемента и вычитаем 10
            }
            // Случай 2: Перетащили в самый низ
            else if (newIndex === currentTasks.length - 1) {
                newOrder = currentTasks[currentTasks.length - 1].order + 10; // Берем order последнего и прибавляем 10
            }
            // Случай 3: Перетащили куда-то в середину
            else {
                // Если перетащили ВНИЗ (новый индекс больше старого)
                const prevTask = currentTasks[newIndex];
                const nextTask = currentTasks[newIndex + (newIndex > oldIndex ? 1 : -1)];
                if (prevTask && nextTask) {
                    newOrder = (prevTask.order + nextTask.order) / 2;
                } else {
                    // Аварийный случай, если что-то пошло не так
                    newOrder = currentTasks[newIndex].order + (newIndex > oldIndex ? 5 : -5);
                }
            }

            dispatch(updateTaskApi({
                taskId: active.id as string,
                changes: { order: newOrder },
            }));

            // if (over && active.id !== over.id) {
            //     dispatch(reOrderTask({
            //         fromId: active.id as string,
            //         toId: over.id as string
            //     }))
            // }
        }
    }

    const handleEditingTask = (taskId: string) => {
        dispatch(startEditingTask({
            taskId: taskId,
            mode: 'persistent'
        }))
    }

    const isToday = (someDate: Date | null | undefined): boolean => {
        if (!someDate) return false;
        const today = new Date();
        const date = new Date(someDate);
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
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

    // Рендер

    const renderSortableTaskCard = (task: Task) => {
        return (
            <SortableTaskCard
                key={task.id}
                task={task}
                featureSlot={<ToggleTask task={task} />}
                actionsSlot={
                    <>
                        <ToggleFavourite task={task} />
                        <DeleteTask taskId={task.id} />
                    </>
                }
                hoverActionsSlot={
                    <>
                        <SetTaskToday task={task} />
                        <IconButton onClick={() => handleEditingTask(task.id)}>
                            <EditIcon />
                        </IconButton>
                    </>
                }
            />
        )
    }

    const renderContent = () => {
        // Сценарий 1: Выбран конкретный список
        if (selectedListId !== ALL_TASKS_LIST_ID && selectedListId !== TODAY_TASKS_LIST_ID) {
            const filteredAndSortedTasks = allTasks
                .filter(task => task.listOwnerId === selectedListId)
                .slice()
                .sort((a, b) => a.order - b.order);

            // Находим название текущего списка для заголовка
            const currentList = allLists.find(list => list.id === selectedListId);

            return (
                <>
                    <ListHeader />
                    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                        <SortableContext items={filteredAndSortedTasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
                            {filteredAndSortedTasks.map(task => (
                                renderSortableTaskCard(task)
                            ))}
                        </SortableContext>
                    </DndContext>
                </>
            );
        } else if (selectedListId === TODAY_TASKS_LIST_ID) {
            // НОВАЯ ЛОГИКА ДЛЯ "СЕГОДНЯ"
            // Находим и СОРТИРУЕМ задачи для каждого списка
            const tasksToRender = allTasks
                .filter(task => isToday(task.startDate))
                .slice()
                .sort((a, b) => a.order - b.order);

            return (
                <>
                    <ListHeader />
                    {/* Отключаем D&D для режима "Все задачи", как ты и хотел! */}
                    <Box mb={4}>
                        {tasksToRender.map(task => (
                            // Используем обычную TaskCard, т.к. сортировки нет
                            // <TaskCard key={task.id} task={task} /* ... пропсы для обычной карточки ... */ />
                            renderSortableTaskCard(task)
                        ))}
                    </Box>
                </>
            );
        } else if (selectedListId === ALL_TASKS_LIST_ID) {
            // Сценарий 2: Выбраны "Все задачи"
            // Группируем задачи по их listOwnerId
            const groupedTasks = allLists.reduce((acc, list) => {
                // Находим и СОРТИРУЕМ задачи для каждого списка
                const tasksInList = allTasks
                    .filter(task => task.listOwnerId === list.id)
                    .slice()
                    .sort((a, b) => a.order - b.order);

                if (tasksInList.length > 0) {
                    acc[list.id] = {
                        listName: list.name,
                        tasks: tasksInList,
                    };
                }
                return acc;
            }, {} as Record<string, { listName: string; tasks: Task[] }>);

            return (
                <>
                    <ListHeader />
                    {/* Отключаем D&D для режима "Все задачи", как ты и хотел! */}
                    {Object.values(groupedTasks).map(({ listName, tasks }) => (
                        <Box key={listName} mb={4}>
                            <Typography variant="h6">{listName}</Typography>
                            {tasks.map(task => (
                                // Используем обычную TaskCard, т.к. сортировки нет
                                // <TaskCard key={task.id} task={task} /* ... пропсы для обычной карточки ... */ />
                                renderSortableTaskCard(task)
                            ))}
                        </Box>
                    ))}
                </>
            );
        }
    };

    return (
        <div>
            {renderContent()}
            {/* Форма создания задачи остается здесь */}
            {isFormVisible ? (
                <InlineCreateTask
                    listId={selectedListId}
                    onClose={() => setIsFormVisible(false)}
                />
            ) : (
                <Button
                    startIcon={<AddIcon />}
                    onClick={() => setIsFormVisible(true)}
                >
                    Добавить задачу
                </Button>
            )}
        </div >
    );

    // return (
    //     <div>
    //         <h1>Tasks page</h1>
    //         <h2>Тут потом будет название листа</h2>
    //         <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} >
    //             {/* 7. Внутри оборачиваем в SortableContext, передавая ему массив ID */}
    //             <SortableContext items={filteredTaskIds} strategy={verticalListSortingStrategy} >
    //                 <div>
    //                     {/* 8. Рендерим отфильтрованный список, но используем SortableTaskCard */}
    //                     {filteredTasks.map((task) => (
    //                         <>
    //                             {/* <ListItemIcon><CircleIcon fontSize="small" sx={{ color: list.color }} /></ListItemIcon> */}
    //                             <SortableTaskCard
    //                                 key={task.id}
    //                                 task={task}
    //                                 featureSlot={<ToggleTask task={task} />}
    //                                 actionsSlot={
    //                                     <>
    //                                         <IconButton onClick={() => handleEditingTask(task.id)}>
    //                                             <EditIcon />
    //                                         </IconButton>
    //                                         <DeleteTask taskId={task.id} />
    //                                     </>
    //                                 }
    //                             />
    //                         </>
    //                     ))}
    //                 </div>
    //             </SortableContext>
    //         </DndContext>

    //         {isFormVisible ? (
    //             <InlineCreateTask
    //                 listId={selectedListId}
    //                 onClose={() => setIsFormVisible(false)}
    //             />
    //         ) : (
    //             <Button
    //                 startIcon={<AddIcon />}
    //                 onClick={() => setIsFormVisible(true)}
    //             >
    //                 Добавить задачу
    //             </Button>
    //         )}
    //         {/* <CreateTaskButton onClick={() => setModalState('create')} /> */}
    //         {/* 4. Рендерим модальное окно по условию */}
    //         {/* {modalState !== 'closed' && (
    //             <TaskModal
    //                 // Если стейт - это объект, передаем его. Иначе - null.
    //                 taskToEdit={typeof modalState === 'object' ? modalState : null}
    //                 onClose={handleCloseModal}
    //             />
    //         )} */}
    //     </div>
    // )
}