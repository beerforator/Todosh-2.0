import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { updateTaskApi } from '../../app/services/taskServices/updateTaskApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';
import { tasksSelectors } from '@/app/providers/store/slices/tasksSlice';
import { RootState } from '@/app/providers/store/types';
import { ToggleFavourite } from '@/shared/ui/TaskManipulationIcons/ToggleFavourite';

interface ToggleFavouriteContainerProps {
    taskId: string,
    size?: 'small' | 'medium' | 'large',
    className?: string
}

export const ToggleFavouriteContainer = React.memo(({ taskId, size = 'medium' }: ToggleFavouriteContainerProps) => {
    const [setToggle, isSettingToggle] = useApiRequest(updateTaskApi, {})

    const isFavourite = useSelector((state: RootState) =>
        tasksSelectors.selectById(state, taskId)?.isFavourite
    );

    const handleToggle = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();

        let payload = {
            taskId: taskId,
            changes: { isFavourite: !isFavourite }
        }

        setToggle(payload)
    }, [isFavourite, taskId, setToggle])

    return (
        <ToggleFavourite
            size={size}
            isFavourite={isFavourite}
            isSettingToggle={isSettingToggle}
            handleToggle={handleToggle}
        />
    );
})


