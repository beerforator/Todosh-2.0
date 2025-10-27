import { baseApi } from "@/shared/api/base";
import { Task } from "@/shared/types/entities";
import { createAsyncThunk } from "@reduxjs/toolkit";

type CreateTaskArg = Pick<Task, 'title'> & Partial<Pick<Task, 'startDate' | 'endDate' | 'listOwnerId'>>

export const createTask = createAsyncThunk<Task, CreateTaskArg>(
    'task/createTask',
    async ({ title, startDate, endDate, listOwnerId}, thunkApi) => {
        const newTaskData: Omit<Task, 'id'> = {
            title: title,
            description: "",

            startDate: startDate,
            endDate: endDate,

            userOwnerId: 'user-1',
            listOwnerId: listOwnerId || 'list-inbox',

            isCompleted: false,
            isFavourite: false,
            
            order: Date.now()
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