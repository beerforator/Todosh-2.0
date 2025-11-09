import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import type { List } from '@/shared/types/entities';
import { RootState } from '@/app/providers/store/types';
import { updateListApi } from '@/app/services/listServices/updateListApi';
import { fetchListsApi } from '@/app/services/listServices/fetchListsApi';
import { createListApi } from '@/app/services/listServices/createListApi';
import { deleteListApi } from '@/app/services/listServices/deleteListApi';

export const ALL_TASKS_LIST_ID = 'all';
export const TODAY_TASKS_LIST_ID = 'today';

const listsAdapter = createEntityAdapter<List>({
    selectId: (list) => list.id,
});

interface ListsState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed',
    error: string | null,
    selectedListId: string
}

const initialState = listsAdapter.getInitialState<ListsState>({
    loading: 'idle',
    error: null,
    selectedListId: ALL_TASKS_LIST_ID
});

export const listsSlice = createSlice({
    name: 'lists',
    initialState: initialState,
    reducers: {
        addList: listsAdapter.addOne,
        updateList: listsAdapter.updateOne,
        removeList: listsAdapter.removeOne,
        setLists: listsAdapter.setAll,
        selectList: (state, action: PayloadAction<string>) => {
            state.selectedListId = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchListsApi.fulfilled, (state, action: PayloadAction<List[]>) => {
                state.loading = 'succeeded'
                listsAdapter.setAll(state, action.payload)
                if (!state.selectedListId && action.payload.length > 0) {
                    const inbox = action.payload.find(l => l.id === 'list-inbox') || action.payload[0]
                    state.selectedListId = inbox.id
                }
            })
            .addCase(createListApi.fulfilled, (state, action: PayloadAction<List>) => {
                listsAdapter.addOne(state, action.payload)
            })
            .addCase(updateListApi.fulfilled, (state, action) => {
                listsAdapter.updateOne(state, {
                    id: action.payload.id,
                    changes: action.payload
                })
            })
            .addCase(deleteListApi.fulfilled, (state, action) => {
                listsAdapter.removeOne(state, action.payload)
            })
    }
});

export const { addList, updateList, removeList, setLists, selectList } = listsSlice.actions;

export const listsSelectors = listsAdapter.getSelectors<RootState>(
    (state) => state.lists
);

export const listsReducer = listsSlice.reducer;
