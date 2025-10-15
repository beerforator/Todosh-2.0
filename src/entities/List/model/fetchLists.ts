import { baseApi } from "@/shared/api/base";
import { List } from "@/shared/types/entities";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Первый аргумент ('lists/fetchAll') - это название экшена, оно используется для дебага.
// Второй аргумент - это асинхронная функция, которая выполнит запрос.
export const fetchLists = createAsyncThunk<List[]>(
    'lists/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await baseApi.get<List[]>('lists')
            return response
        }
        catch {
            // Если произошла ошибка, мы ее "отклоняем", и thunk перейдет в состояние rejected.
            return thunkApi.rejectWithValue('Failed to fetch lists')
        }
    }
)