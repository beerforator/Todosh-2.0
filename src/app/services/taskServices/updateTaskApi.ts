import { baseApi } from "@/shared/api/base";
import { Task } from "@/shared/types/entities";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface UpdateTaskArg {
    taskId: string,
    changes: Partial<Task>
}

export const updateTaskApi = createAsyncThunk<Task, UpdateTaskArg>(
    'task/updateTask',
    async ({ taskId, changes }, thunkApi) => {
        const normChanges = { ...changes };
        if (normChanges.startDate) {
            const d = new Date(normChanges.startDate);
            d.setHours(0, 0, 0, 1);
            normChanges.startDate = d;
        }
        if (normChanges.endDate) {
            const d = new Date(normChanges.endDate);
            normChanges.endDate = d;
        }

        try {
            const response = await baseApi.patch<Task>(`tasks/${taskId}`, normChanges)
            return response
        }
        catch (error) {
            return thunkApi.rejectWithValue("Failed to update task")
        }
    }
)