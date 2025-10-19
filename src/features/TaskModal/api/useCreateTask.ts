import { baseApi } from "@/shared/api/base";
import { Task } from "@/shared/types/entities";
import { createAsyncThunk } from "@reduxjs/toolkit";

type CreateTaskArg = Pick<Task, 'title'>;

export const createTask = createAsyncThunk<Task, CreateTaskArg>(
    'task/createTask',
    async ({ title }, thunkApi) => {
        const newTaskData: Omit<Task, 'id'> = {
            title: title,
            description: "Add discription for task",

            // startDate?: Date,
            // endDate?: Date,

            userOwnerId: 'user-1',
            listOwnerId: 'list-inbox',

            isCompleted: false,
            isFavourite: false,
        }

        try {
            const response = await baseApi.post<Task>(`tasks/`, newTaskData)
            return response
        }
        catch {
            return thunkApi.rejectWithValue('Failed to create task')
        }
    }
)