import React from 'react';

import styleT from '@/app/styles/MainContentStyles/TasksPage.module.scss'

interface EmptTaskRowProps {
    isPanePersistent: boolean
}

export const EmptyTaskRow = React.memo(({ isPanePersistent }: EmptTaskRowProps) => {
    return (
        <div
            className={isPanePersistent
                ? (styleT.emptyLine_container + ' ' + styleT.collapsed)
                : (styleT.emptyLine_container)}
        >
            <div
                className={styleT.emptyLineEffect}
            ></div>
        </div>
    );
})