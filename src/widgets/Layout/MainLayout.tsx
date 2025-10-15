// src/widgets/Layout/MainLayout.tsx
import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/widgets/Sidebar/Sidebar';

export const MainLayout = () => {
  const layoutStyles: React.CSSProperties = {
    display: 'flex',
  };
  
  const contentStyles: React.CSSProperties = {
    flexGrow: 1,
    padding: '20px'
  };

  return (
    <div style={layoutStyles}>
      <Sidebar />
      <main style={contentStyles}>
        {/* <Outlet /> - это специальный компонент от react-router-dom.
            Именно сюда он будет "вставлять" наши страницы (/tasks, /calendar) */}
        <Outlet /> 
      </main>
    </div>
  );
};