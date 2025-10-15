import { baseApi } from "@/shared/api/base";
import { Task } from "@/shared/types/entities";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Первый аргумент ('tasks/fetchAll') - это название экшена, оно используется для дебага.
// Второй аргумент - это асинхронная функция, которая выполнит запрос.
export const fetchTasks = createAsyncThunk<Task[]>(
    'tasks/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await baseApi.get<Task[]>('tasks')
            return response
        }
        catch {
            // Если произошла ошибка, мы ее "отклоняем", и thunk перейдет в состояние rejected.
            return thunkApi.rejectWithValue('Failed to fetch tasks')
        }
    }
)