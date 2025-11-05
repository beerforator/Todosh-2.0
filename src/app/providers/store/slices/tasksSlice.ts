import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '@/shared/types/entities';
import { RootState } from '@/app/providers/store/types';
import { updateTaskApi } from '@/app/services/taskServices/updateTaskApi';
import { fetchTasksApi } from '@/app/services/taskServices/fetchTasksApi';
import { createTaskApi } from '@/app/services/taskServices/createTaskApi';
import { deleteTaskApi } from '@/app/services/taskServices/deleteTaskApi';
import { deleteListApi } from '@/app/services/listServices/deleteListApi';

const tasksAdapter = createEntityAdapter<Task>({
    selectId: (task) => task.id,
});

interface TasksState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState = tasksAdapter.getInitialState<TasksState>({
    loading: 'idle',
    error: null
});

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: initialState,
    reducers: {
        addTask: tasksAdapter.addOne,
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
            .addCase(fetchTasksApi.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = 'succeeded'
                tasksAdapter.setAll(state, action.payload)
            })
            .addCase(createTaskApi.fulfilled, (state, action: PayloadAction<Task>) => {
                tasksAdapter.addOne(state, action.payload)
            })
            .addCase(deleteTaskApi.fulfilled, (state, action: PayloadAction<string>) => {
                tasksAdapter.removeOne(state, action.payload);
            })
            .addCase(updateTaskApi.fulfilled, (state, action: PayloadAction<Task>) => {
                tasksAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: action.payload
                });
            })
            .addCase(deleteListApi.fulfilled, (state, action) => {
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