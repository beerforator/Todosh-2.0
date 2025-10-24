import { baseApi } from "@/shared/api/base";
import { Task } from "@/shared/types/entities";
import { createAsyncThunk } from "@reduxjs/toolkit";

type CreateTaskArg = Pick<Task, 'title'> & Partial<Pick<Task, 'startDate' | 'endDate'>>

export const createTask = createAsyncThunk<Task, CreateTaskArg>(
    'task/createTask',
    async ({ title, startDate, endDate }, thunkApi) => {
        const newTaskData: Omit<Task, 'id'> = {
            title: title,
            description: "Add discription for task",

            startDate: startDate,
            endDate: endDate,

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