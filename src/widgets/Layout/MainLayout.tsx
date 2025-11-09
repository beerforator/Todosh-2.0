import { Outlet } from 'react-router-dom';
import { UnifiedSidebar } from '../Sidebar/UnifiedSidebar';
import { Header } from '../Header/Header';
import { TaskDetailsPaneContainer } from '../TaskDetailsPane/TaskDetailsPane.container';
import React from 'react';

const PANE_WIDTH = 400;
const MARGIN_RIGHT = PANE_WIDTH + 20

interface MainLayoutProps {
    isPanePersistent: boolean;
}

export const MainLayout = React.memo(({ isPanePersistent }: MainLayoutProps) => {
    console.log('MainLayout\n\n')

    const layoutStyles: React.CSSProperties = {
        display: 'flex',
    };

    const contentStyles: React.CSSProperties = {
        flexGrow: 1,
        padding: '0 20px 20px',
        height: '100vh',
        overflow: 'auto',
        transition: 'margin-right 0.1s ease-in-out',
        // marginRight: isPanePersistent ? `${MARGIN_RIGHT}px` : '0px'
    };

    const mainContentStyles: React.CSSProperties = {
        flexGrow: 1,
        padding: '20px',
        transition: 'margin-right 0.3s ease',
        marginRight: isPanePersistent ? `${PANE_WIDTH}px` : '0px',
    };

    return (
        <div style={layoutStyles}>
            <UnifiedSidebar />
            <div style={contentStyles}>
                <Header />
                <main style={mainContentStyles}>
                    <Outlet />
                    <TaskDetailsPaneContainer />
                </main>
            </div>

        </div>
    );
})