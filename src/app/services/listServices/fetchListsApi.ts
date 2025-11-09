import { baseApi } from "@/shared/api/base";
import { List } from "@/shared/types/entities";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchListsApi = createAsyncThunk<List[]>(
    'lists/fetchAll',
    async (_, thunkApi) => {
        try {
            const response = await baseApi.get<List[]>('lists')
            return response
        }
        catch {
            return thunkApi.rejectWithValue('Failed to fetch lists')
        }
    }
)