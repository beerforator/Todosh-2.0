import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers/store/types';
import { TaskDetailsPane } from './TaskDetailsPane';
import { Box } from '@mui/material';

export const TaskDetailsPaneContainer = () => {
    // 1. ВСЯ ПОДПИСКА НА REDUX ПЕРЕЕХАЛА СЮДА
    const { editingTaskId, detailsPaneMode } = useSelector((state: RootState) => state.uiReducer);

    // 2. Рендерим панель, только если есть ID
    if (!editingTaskId) {
        return null;
    }

    const containerStyles: React.CSSProperties = {
        transition: 'width 0.3s ease',
        width: (!!editingTaskId && detailsPaneMode === 'persistent') ? '400px' : '0px',
        flexShrink: 0, // Запрещаем контейнеру сжиматься
    };

    return (
        <>
            <Box sx={containerStyles} >
                <TaskDetailsPane
                    taskId={editingTaskId}
                    width={400}
                    variant={detailsPaneMode}
                />
            </Box>
        </>);
};