// src/app/providers/router/AppRouter.tsx

import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage, CalendarPage, DashBoardPage, ProfilePage, TasksPage } from '@/pages';
import { MainLayout } from '@/widgets/Layout/MainLayout';

export const AppRouter = () => {
    // Это временная "заглушка". 
    // Позже мы будем брать реальное значение из Redux-стора, чтобы проверять, вошел ли пользователь в систему.
    const isAuth = true;

    // Если пользователь авторизован, показываем ему страницы приложения
    if (isAuth) {
        return (
            <Routes>
                <Route path="/" element={<MainLayout />}>
                    {/* 3. Все страницы теперь являются дочерними для этого маршрута.
              Они будут рендериться на месте <Outlet /> */}
                    {/* ПОТОМ СДЕЛАМ ДАШБОРД ГЛАВНОЙ */}
                    <Route index element={<Navigate to="/tasks" replace />} /> {/* Главная по умолчанию */}
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/dashboard" element={<DashBoardPage />}/>
                    <Route path="/profile" element={<ProfilePage />}/>
                </Route>
                {/* Если авторизованный пользователь зайдет на любой другой URL, 
            мы его автоматически перенаправим на главную страницу с задачами. */}
                <Route path="*" element={<Navigate to="/tasks" replace />} />
            </Routes>
        );
    }

    // Если пользователь НЕ авторизован, показываем ему только страницу входа
    return (
        <Routes>
            <Route path="/auth" element={<AuthPage />} />
            {/* Если неавторизованный пользователь попробует зайти куда-то еще,
          мы его автоматически перенаправим на страницу авторизации. */}
            <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
    );
};