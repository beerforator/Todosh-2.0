import React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/app/providers/store/types';
import { startEditingTask } from '@/app/services/UISlice/UISlice';
import { ToggleEditPane } from '@/shared/ui/TaskManipulationIcons/ToggleEditPane';

interface ToggleEditPaneContainerProps {
    taskId: string,
    mode: 'temporary' | 'persistent'
}

export const ToggleEditPaneContainer = React.memo(({ taskId, mode = 'temporary' }: ToggleEditPaneContainerProps) => {
    const dispatch: AppDispatch = useDispatch();

    const handleEditingTask = useCallback(() => {
        dispatch(startEditingTask({
            taskId: taskId,
            mode: mode
        }))
    }, [dispatch, taskId, mode])

    return (
        <ToggleEditPane
            handleEditingTask={handleEditingTask}
        />
    )
});