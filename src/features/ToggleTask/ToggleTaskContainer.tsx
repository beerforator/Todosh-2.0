import { updateTaskApi } from '../../app/services/taskServices/updateTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { useCallback } from 'react';
import { tasksSelectors } from '@/app/providers/store/slices/tasksSlice';
import { RootState } from '@/app/providers/store/types';
import { useSelector } from 'react-redux';
import React from 'react';
import { ToggleTask } from '@/shared/ui/TaskManipulationIcons/ToggleTask';

interface ToggleTaskContainerProps {
    taskId: string,
    size?: 'small' | 'medium'
}

export const ToggleTaskContainer = React.memo(({ taskId, size = 'medium' }: ToggleTaskContainerProps) => {
    const [letToggle, isLettingToggle] = useApiRequest(updateTaskApi, {})

    const isCompleted = useSelector((state: RootState) =>
        tasksSelectors.selectById(state, taskId)?.isCompleted
    );

    const handleToggle = useCallback((e: React.ChangeEvent) => {
        e.stopPropagation()

        let payload = {
            taskId: taskId,
            changes: { isCompleted: !isCompleted }
        }

        letToggle(payload)
    }, [isCompleted, taskId, letToggle])

    return (
        <ToggleTask
            size={size}
            isCompleted={isCompleted}
            isLettingToggle={isLettingToggle}
            handleToggle={handleToggle}
        />
    );
});

