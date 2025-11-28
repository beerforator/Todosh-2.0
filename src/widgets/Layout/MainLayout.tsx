import { Outlet } from 'react-router-dom';
import { UnifiedSidebar } from '../Sidebar/UnifiedSidebar';
import { Header } from '../Header/Header';
import { TaskDetailsPaneContainer } from '../TaskDetailsPane/TaskDetailsPane.container';
import React from 'react';

import styleM from '@/app/styles/MainLayout.module.scss'  // '/app/styles/MainLayot.module.scss'

export const MainLayout = React.memo(() => {
    return (
        <div className={styleM.window}>
            <UnifiedSidebar />
            <div className={styleM.appWidgetsLevel_container}>
                <Header />
                <main className={styleM.collapsing_container}>
                    <div className={styleM.mainContent_container}>
                        <Outlet />
                    </div>
                    <TaskDetailsPaneContainer />
                </main>
            </div>
        </div>
    );
})