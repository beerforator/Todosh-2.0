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
        // debugger

        const normChanges = { ...changes };
        if (normChanges.startDate) {
            const d = new Date(normChanges.startDate);
            d.setHours(0, 0, 0, 1);
            normChanges.startDate = d;
        }
        if (normChanges.endDate) {
            const d = new Date(normChanges.endDate);
            // d.setHours(23, 59, 59, 999);
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


// import { baseApi } from "@/shared/api/base";
// import { Task } from "@/shared/types/entities";
// import { createAsyncThunk } from "@reduxjs/toolkit";

// interface UpdateTaskArg {
//     id: string,
//     changes: Partial<Pick<Task, 'isCompleted'>>
// }

// export const updateTaskCompletio = createAsyncThunk<Task, UpdateTaskArg>(
//     'task/updateCompletion',
//     async ({ id, changes }, thunkApi) => {
//         try {
//             const response = await baseApi.patch<Task>(`tasks/${id}`, changes)
//             return response
//         }
//         catch {
//             return thunkApi.rejectWithValue('Failed to update task completion status')
//         }
//     }
// )