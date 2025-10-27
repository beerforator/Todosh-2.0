import { baseApi } from "@/shared/api/base";
import { List } from "@/shared/types/entities";
import { createAsyncThunk } from "@reduxjs/toolkit";

type CreateListArg = Omit<List, 'id' | 'userOwnerId'>

export const createList = createAsyncThunk<List, CreateListArg>(
    'lists/createList',
    async ({name, color}, thunkApi) => {
        const newListData = {
            name: name,
            color: color,
            userOwnerId: "user-1"
        }
        try {
            const response = await baseApi.post<List>('lists', newListData)
            return response
        }
        catch (error) {
            return thunkApi.rejectWithValue("Failed to create List")
        }
    }
)