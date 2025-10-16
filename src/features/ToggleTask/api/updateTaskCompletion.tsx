import { baseApi } from "@/shared/api/base";
import { Task } from "@/shared/types/entities";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface UpdateTaskArg {
    id: string,
    changes: Partial<Pick<Task, 'isCompleted'>>
}

export const updateTaskCompletion = createAsyncThunk<Task, UpdateTaskArg>(
    'task/updateCompletion',
    async ({id, changes}, thunkApi) => {
        try {
            const response = await baseApi.patch<Task>(`tasks/${id}`, changes)
            return response
        }
        catch {
            return thunkApi.rejectWithValue('Failed to update task completion status')
        }
    }
)