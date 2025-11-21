import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/providers/store/types';
import { MainLayout } from './MainLayout';
import { startEditingTask } from '@/app/services/UISlice/UISlice';

export const MainLayoutContainer = () => {
    // debugger
    const { editingTaskId, detailsPaneMode } = useSelector((state: RootState) => state.uiReducer);
    const isPanePersistent = !!editingTaskId && detailsPaneMode === 'persistent';

    // const dispatch: AppDispatch = useDispatch();
    // dispatch(startEditingTask({
    //     taskId: '8',
    //     mode: 'persistent'
    // }))

    return <MainLayout isPanePersistent={isPanePersistent} />;
};