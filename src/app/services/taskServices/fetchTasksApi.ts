import { baseApi } from "@/shared/api/base";
import { Task } from "@/shared/types/entities";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTasksApi = createAsyncThunk<Task[]>(
    'tasks/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await baseApi.get<Task[]>('tasks')
            return response
        }
        catch {
            return thunkApi.rejectWithValue('Failed to fetch tasks')
        }
    }
)