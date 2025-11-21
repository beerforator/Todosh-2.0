import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers/store/types';
import { TaskDetailsPane } from './TaskDetailsPane';
import { Box } from '@mui/material';

import styleP from '@/app/styles/TaskDetailsPane.module.scss'

export const TaskDetailsPaneContainer = () => {
    const { editingTaskId, detailsPaneMode } = useSelector((state: RootState) => state.uiReducer);

    if (!editingTaskId) {
        return null;
    }

    return (

        <div className={(!!editingTaskId && detailsPaneMode === 'persistent')
            ? (styleP.drawerContainer)
            : (styleP.drawerContainerr + ' ' + styleP.drawerContainer_closed)}
        >
            <TaskDetailsPane
                taskId={editingTaskId}
                width={400}
                variant={detailsPaneMode}
            />
        </div>
    );
};