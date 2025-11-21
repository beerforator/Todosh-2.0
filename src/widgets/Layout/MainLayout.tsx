import { Outlet } from 'react-router-dom';
import { UnifiedSidebar } from '../Sidebar/UnifiedSidebar';
import { Header } from '../Header/Header';
import { TaskDetailsPaneContainer } from '../TaskDetailsPane/TaskDetailsPane.container';
import React from 'react';

import style from '@/app/styles/MainLayout.module.scss'  // '/app/styles/MainLayot.module.scss'

interface MainLayoutProps {
    isPanePersistent: boolean;
}

export const MainLayout = React.memo(({ isPanePersistent }: MainLayoutProps) => {
    return (
        <div className={style.layoutStyles}>
            <UnifiedSidebar />
            <div className={style.contentStyles}>
                <Header />
                <main className={
                    isPanePersistent
                        ? style.mainContentStylesWPane + ' ' + style.mainContentStyles
                        : style.mainContentStyles
                }>
                    <Outlet />
                    <TaskDetailsPaneContainer />
                </main>
            </div>
        </div>
    );
})