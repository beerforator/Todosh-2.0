import { baseApi } from "@/shared/api/base";
import { Task } from "@/shared/types/entities";
import { createAsyncThunk } from "@reduxjs/toolkit";

type CreateTaskArg = Pick<Task, 'title'> & Partial<Pick<Task, 'startDate' | 'endDate' | 'listOwnerId'>>

export const createTaskApi = createAsyncThunk<Task, CreateTaskArg>(
    'task/createTask',
    async ({ title, startDate, endDate, listOwnerId }, thunkApi) => {
        let normStartDate = startDate ? new Date(startDate) : undefined;
        let normEndDate = endDate ? new Date(endDate) : undefined;
        normEndDate?.setDate(normEndDate.getDate() + 1);

        if (normStartDate) normStartDate.setHours(0, 0, 0, 1);

        const newTaskData: Omit<Task, 'id'> = {
            title: title,
            description: "",

            startDate: normStartDate,
            endDate: normEndDate,

            userOwnerId: 'user-1',
            listOwnerId: listOwnerId || 'list-inbox',

            isCompleted: false,
            isFavourite: false,

            order: Date.now()
        }

        console.log(newTaskData)

        try {
            const response = await baseApi.post<Task>(`tasks/`, newTaskData)
            return response
        }
        catch {
            return thunkApi.rejectWithValue('Failed to create task')
        }
    }
)