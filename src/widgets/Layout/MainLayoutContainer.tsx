import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers/store/types';
import { MainLayout } from './MainLayout';

export const MainLayoutContainer = () => {
    // ВСЯ "ПОДПИСКА" ЖИВЕТ ТОЛЬКО ЗДЕСЬ
    const { editingTaskId, detailsPaneMode } = useSelector((state: RootState) => state.uiReducer);
    const isPanePersistent = !!editingTaskId && detailsPaneMode === 'persistent';

    return <MainLayout isPanePersistent={isPanePersistent} />;
};