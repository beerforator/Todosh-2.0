// src/features/DeleteList/api/deleteList.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/base';
import { RootState } from '@/app/providers/store/types'; // Нам нужен доступ к стейту

// Thunk вернет ID удаленного списка, чтобы редьюсер знал, что убрать
export const deleteList = createAsyncThunk<string, string>(
    'lists/deleteList',
    async (listId, thunkApi) => {
        const state = thunkApi.getState() as RootState;

        // 1. Находим все задачи, которые нужно удалить
        const allTasks = state.tasks.entities;
        const tasksToDelete = Object.values(allTasks).filter(
            task => task?.listOwnerId === listId
        );

        // 2. Создаем массив промисов на удаление каждой задачи
        const deletePromises = tasksToDelete.map(task => {
            if (task) { // Явная проверка
                try {
                    return baseApi.delete(`tasks/${task.id}`);
                }
                catch (error) {
                    return thunkApi.rejectWithValue('Failed to delete Task by deleting List')
                }

            }
            return Promise.resolve(); // Возвращаем пустой промис, если task - undefined
        }).filter(Boolean); // Убираем пустые промисы

        try {
            // 3. Выполняем все запросы на удаление задач параллельно
            await Promise.all(deletePromises);

            // 4. Только после этого удаляем сам лист
            await baseApi.delete(`lists/${listId}`);

            return listId; // Возвращаем ID для редьюсера
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to delete list and its tasks');
        }
    }
);