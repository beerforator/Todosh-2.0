import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '@/shared/types/entities';
import { fetchTasks } from './fetchTasks';
import { RootState } from '@/app/providers/store/types';
import { createTask } from '@/features/TaskModal/api/useCreateTask';
import { deleteTask } from '@/features/DeleteTask/api/deleteTask';
import { updateTaskApi } from '@/features/EditTask/api/updateTaskApi';
import { deleteList } from '@/features/DeleteList/api/deleteList';

// createEntityAdapter - это мощная утилита от Redux Toolkit для нормализации данных.
// Она автоматически создает для нас структуру { ids: [], entities: {} } и редьюсеры.
const tasksAdapter = createEntityAdapter<Task>({
    // Указываем, по какому полю будет идти нормализация
    selectId: (task) => task.id,
});

interface TasksState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState = tasksAdapter.getInitialState<TasksState>({
    loading: 'idle',
    error: null,
});

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTask: tasksAdapter.addOne,

        // Мы будем передавать в action объект { id: 'task-1', changes: { title: 'New title' } }
        updateTask: tasksAdapter.updateOne,

        removeTask: tasksAdapter.removeOne,

        setTasks: tasksAdapter.setAll,

        reOrderTask: (state, action: PayloadAction<{ fromId: string, toId: string }>) => {
            const { fromId, toId } = action.payload
            const fromIndex = state.ids.indexOf(fromId)
            const toIndex = state.ids.indexOf(toId)

            const [movedItem] = state.ids.splice(fromIndex, 1)
            state.ids.splice(toIndex, 0, movedItem)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = 'succeeded'
                tasksAdapter.setAll(state, action.payload)
            })
            .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
                tasksAdapter.addOne(state, action.payload)
            })
            .addCase(deleteTask.fulfilled, (state, action: PayloadAction<string>) => {
                tasksAdapter.removeOne(state, action.payload);
            })
            .addCase(updateTaskApi.fulfilled, (state, action: PayloadAction<Task>) => {
                tasksAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: action.payload
                });
            })
            .addCase(deleteList.fulfilled, (state, action) => {
                const listId = action.payload;
                const tasksToRemove = Object.values(state.entities)
                    .filter(task => task?.listOwnerId === listId)
                    .map(task => task!.id);

                tasksAdapter.removeMany(state, tasksToRemove);
            });
    }
});

export const { addTask, updateTask, removeTask, setTasks, reOrderTask } = tasksSlice.actions;

export const tasksSelectors = tasksAdapter.getSelectors<RootState>(
    (state) => state.tasks
);

export const tasksReducer = tasksSlice.reducer;