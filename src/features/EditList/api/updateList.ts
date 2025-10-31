// src/features/EditList/api/updateList.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { List } from '@/shared/types/entities';
import { baseApi } from '@/shared/api/base';

export interface UpdateListArg {
    id: string;
    changes: Partial<List>;
}

export const updateListApi = createAsyncThunk<List, UpdateListArg>(
    'lists/updateList',
    async ({ id, changes }, thunkApi) => {
        try {
            const response = await baseApi.patch<List>(`lists/${id}`, changes);
            return response;
        } catch (error) {
            return thunkApi.rejectWithValue('Failed to update list');
        }
    }
);