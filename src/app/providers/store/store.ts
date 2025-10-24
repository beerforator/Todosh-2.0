// src/app/providers/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { tasksReducer } from '@/entities/Task/model/tasksSlice';
import { listsReducer } from '@/entities/List/model/listsSlice';
import { uiReducer } from '@/widgets/UISlice/UISlice';

export const store = configureStore({
    // `reducer` - это корневой редьюсер, который объединяет редьюсеры всех слайсов
    reducer: {
        // Мы говорим: "За состояние под ключом `tasks` отвечает `tasksReducer`"
        tasks: tasksReducer,
        lists: listsReducer,
        uiReducer: uiReducer
        // Здесь мы будем добавлять другие слайсы: lists, auth и т.д.
    },
});