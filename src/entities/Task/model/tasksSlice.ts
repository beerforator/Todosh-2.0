import { createSlice, createEntityAdapter, PayloadAction } from '@reduxjs/toolkit';
import type { Task } from '@/shared/types/entities';
import { fetchTasks } from './fetchTasks';
import { RootState } from '@/app/providers/store/types';

// createEntityAdapter - это мощная утилита от Redux Toolkit для нормализации данных.
// Она автоматически создает для нас структуру { ids: [], entities: {} } и редьюсеры.
const tasksAdapter = createEntityAdapter<Task>({
    // Указываем, по какому полю будет идти нормализация
    selectId: (task) => task.id,
});

interface TasksState {
    loading: 'idle' | 'pending' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState = tasksAdapter.getInitialState<TasksState>({
    loading: 'idle',
    error: null,
});

// Создаем сам "слайс"
export const tasksSlice = createSlice({
    name: 'tasks',
    // Начальное состояние берем из адаптера. Он создаст пустой { ids: [], entities: {} }
    initialState: initialState,
    reducers: {
        // Здесь мы будем описывать синхронные действия.
        // Например, `addTask` будет добавлять одну новую задачу в стейт.
        addTask: tasksAdapter.addOne,

        // `updateTask` будет обновлять существующую задачу.
        // Мы будем передавать в action объект { id: 'task-1', changes: { title: 'New title' } }
        updateTask: tasksAdapter.updateOne,

        // `removeTask` будет удалять задачу по ее id.
        removeTask: tasksAdapter.removeOne,

        // `setTasks` полностью заменит все задачи в стейте.
        // Полезно при получении данных с сервера.
        setTasks: tasksAdapter.setAll,
    },
    // extraReducers используется для асинхронных действий, их мы добавим позже.
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                // Когда запрос начался, ставим статус 'pending'
                state.loading = 'pending'
                state.error = null
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                // Когда запрос успешно завершился, ставим статус 'succeeded'
                // и с помощью setTasks (который мы создали ранее) полностью заменяем задачи в стейте
                state.loading = 'succeeded'
                tasksAdapter.setAll(state, action.payload)
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                // Когда запрос провалился, ставим статус 'failed' и записываем ошибку
                state.loading = 'failed'
                state.error = action.payload as string
            })
    }
});

// Экспортируем наши экшены, чтобы использовать их в компонентах
export const { addTask, updateTask, removeTask, setTasks } = tasksSlice.actions;

// Экспортируем селекторы, которые предоставляет адаптер.
// Селекторы - это функции для получения данных из стейта.
export const tasksSelectors = tasksAdapter.getSelectors<RootState>(
    (state) => state.tasks
);

// Экспортируем сам редьюсер, чтобы подключить его к стору
export const tasksReducer = tasksSlice.reducer;