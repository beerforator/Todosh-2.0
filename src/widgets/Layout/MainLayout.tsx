// src/widgets/Layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';
// import { Sidebar } from '@/widgets/Sidebar/DEPRECATED_Sidebar';
import { UnifiedSidebar } from '../Sidebar/UnifiedSidebar';
import { TaskDetailsPane } from '../TaskDetailsPane/TaskDetailsPane';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/providers/store/types';

const PANE_WIDTH = 400;
const MARGIN_RIGHT = PANE_WIDTH + 20

export const MainLayout = () => {
    const { editingTaskId, detailsPaneMode } = useSelector((state: RootState) => state.uiReducer)
    const isPanePersistent = !!editingTaskId && detailsPaneMode === 'persistent';

    const layoutStyles: React.CSSProperties = {
        display: 'flex',
    };

    const contentStyles: React.CSSProperties = {
        flexGrow: 1,
        padding: '20px',
        height: '100vh',
        overflow: 'auto',
        transition: 'margin-right 0.1s ease-in-out',
        marginRight: isPanePersistent ? `${MARGIN_RIGHT}px` : '0px'
    };

    return (
        <div style={layoutStyles}>
            <UnifiedSidebar />
            <main style={contentStyles}>
                {/* <Outlet /> - это специальный компонент от react-router-dom.
            Именно сюда он будет "вставлять" наши страницы (/tasks, /calendar) */}
                <Outlet />
            </main>
            <TaskDetailsPane width={PANE_WIDTH}/>
        </div>
    );
};