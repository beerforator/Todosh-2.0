import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/base';
import { RootState } from '@/app/providers/store/types'; // Нам нужен доступ к стейту

export const deleteListApi = createAsyncThunk<string, string>(
    'lists/deleteList',
    async (listId, thunkApi) => {
        const state = thunkApi.getState() as RootState;

        const allTasks = state.tasks.entities;
        const tasksToDelete = Object.values(allTasks).filter(
            task => task?.listOwnerId === listId
        );

        const deletePromises = tasksToDelete.map(task => {
            if (task) {
                try {
                    return baseApi.delete(`tasks/${task.id}`);
                }
                catch (error) {
                    return thunkApi.rejectWithValue('Failed to delete Task by deleting List')
                }

            }
            return Promise.resolve();
        }).filter(Boolean);

        try {
            await Promise.all(deletePromises);

            await baseApi.delete(`lists/${listId}`);

            return listId;
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to delete list and its tasks');
        }
    }
);