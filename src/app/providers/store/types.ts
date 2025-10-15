import { store } from './store';

// Эти типы нужны нам для удобной работы со стором в TypeScript
// RootState - это тип всего нашего глобального состояния

export type RootState = ReturnType<typeof store.getState>;

// AppDispatch - это тип функции dispatch, которая отправляет экшены в стор

export type AppDispatch = typeof store.dispatch;