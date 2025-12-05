// src/app/providers/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { listsReducer } from '@/app/providers/store/slices/listsSlice';
import { uiReducer } from '@/app/services/UISlice/UISlice';
import { tasksReducer } from './slices/tasksSlice';
import { settingsReducer } from './slices/settingsSlice';

export const store = configureStore({
    // `reducer` - это корневой редьюсер, который объединяет редьюсеры всех слайсов
    reducer: {
        // Мы говорим: "За состояние под ключом `tasks` отвечает `tasksReducer`"
        tasks: tasksReducer,
        lists: listsReducer,
        uiReducer: uiReducer,
        settings: settingsReducer
        // Здесь мы будем добавлять другие слайсы: lists, auth и т.д.
    },
});