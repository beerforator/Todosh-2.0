import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import type { List } from '@/shared/types/entities';
import { fetchLists } from './fetchLists';
import { RootState } from '@/app/providers/store/types';
import { createList } from '@/features/CreateList/api/createList';

// createEntityAdapter - это мощная утилита от Redux Toolkit для нормализации данных.
// Она автоматически создает для нас структуру { ids: [], entities: {} } и редьюсеры.
export const ALL_TASKS_LIST_ID = 'all';

const listsAdapter = createEntityAdapter<List>({
    // Указываем, по какому полю будет идти нормализация
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

// Создаем сам "слайс"
export const listsSlice = createSlice({
    name: 'lists',
    // Начальное состояние берем из адаптера. Он создаст пустой { ids: [], entities: {} }
    initialState: initialState,
    reducers: {
        // Здесь мы будем описывать синхронные действия.
        // Например, `addTask` будет добавлять одну новую задачу в стейт.
        addList: listsAdapter.addOne,

        // `updateTask` будет обновлять существующую задачу.
        // Мы будем передавать в action объект { id: 'task-1', changes: { title: 'New title' } }
        updateList: listsAdapter.updateOne,

        // `removeTask` будет удалять задачу по ее id.
        removeList: listsAdapter.removeOne,

        // `setTasks` полностью заменит все задачи в стейте.
        // Полезно при получении данных с сервера.
        setLists: listsAdapter.setAll,


        selectList: (state, action: PayloadAction<string>) => {
            state.selectedListId = action.payload
        }
    },
    // extraReducers используется для асинхронных действий, их мы добавим позже.
    extraReducers: (builder) => {
        builder
            // .addCase(fetchLists.pending, (state) => {
            //     // Когда запрос начался, ставим статус 'pending'
            //     state.loading = 'pending'
            //     state.error = null
            // })
            // .addCase(fetchLists.rejected, (state, action) => {
            //     // Когда запрос провалился, ставим статус 'failed' и записываем ошибку
            //     state.loading = 'failed'
            //     state.error = action.payload as string
            // })
            .addCase(fetchLists.fulfilled, (state, action: PayloadAction<List[]>) => {
                // Когда запрос успешно завершился, ставим статус 'succeeded'
                // и с помощью setTasks (который мы создали ранее) полностью заменяем задачи в стейте
                state.loading = 'succeeded'
                listsAdapter.setAll(state, action.payload)
                if (!state.selectedListId && action.payload.length > 0) {
                    const inbox = action.payload.find(l => l.id === 'list-inbox') || action.payload[0]
                    state.selectedListId = inbox.id
                }
            })
            .addCase(createList.fulfilled, (state, action: PayloadAction<List>) => {
                listsAdapter.addOne(state, action.payload)
            })
    }
});

// Экспортируем наши экшены, чтобы использовать их в компонентах
export const { addList, updateList, removeList, setLists, selectList } = listsSlice.actions;

// Экспортируем селекторы, которые предоставляет адаптер.
// Селекторы - это функции для получения данных из стейта.
export const listsSelectors = listsAdapter.getSelectors<RootState>(
    (state) => state.lists
);

// Экспортируем сам редьюсер, чтобы подключить его к стору
export const listsReducer = listsSlice.reducer;