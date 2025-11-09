import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers/store/types';
import { TaskDetailsPane } from './TaskDetailsPane';

export const TaskDetailsPaneContainer = () => {
    // 1. ВСЯ ПОДПИСКА НА REDUX ПЕРЕЕХАЛА СЮДА
    const { editingTaskId, detailsPaneMode } = useSelector((state: RootState) => state.uiReducer);

    // 2. Рендерим панель, только если есть ID
    if (!editingTaskId) {
        return null;
    }

    return (
        <TaskDetailsPane
            taskId={editingTaskId}
            width={400}
            variant={detailsPaneMode}
        />
    );
};