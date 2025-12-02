import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { RootState, AppDispatch } from '@/app/providers/store/types';
import { MainLayout } from './MainLayout';
import { stopEditingTask } from '@/app/services/UISlice/UISlice';

export const MainLayoutContainer = () => {
    const dispatch: AppDispatch = useDispatch();
    const location = useLocation(); // "Следит" за URL

    const { editingTaskId, detailsPaneMode } = useSelector((state: RootState) => state.uiReducer);
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);

    useEffect(() => {
        if (editingTaskId) {
            dispatch(stopEditingTask());
        }
    }, [location.pathname, selectedListId, dispatch]);

    return <MainLayout />;
};