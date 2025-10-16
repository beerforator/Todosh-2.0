import { baseApi } from "@/shared/api/base";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteTask = createAsyncThunk<string, string>(
    'task/deleteTask',
    async (taskId, thunkApi) => {
        try {
            await baseApi.delete(`tasks/${taskId}`)
            return taskId
        }
        catch {
            return thunkApi.rejectWithValue('Failed to delete task')
        }
    }
)