import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthPage, CalendarPage, DashBoardPage, ProfilePage, TasksPage } from '@/pages';
import { MainLayoutContainer } from '@/widgets/Layout/MainLayotContainer';

export const AppRouter = () => {
    const isAuth = true;

    if (isAuth) {
        return (
            <Routes>
                <Route path="/" element={<MainLayoutContainer />}>
                    <Route index element={<Navigate to="/tasks" replace />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/dashboard" element={<DashBoardPage />}/>
                    <Route path="/profile" element={<ProfilePage />}/>
                </Route>
                <Route path="*" element={<Navigate to="/tasks" replace />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
    );
};