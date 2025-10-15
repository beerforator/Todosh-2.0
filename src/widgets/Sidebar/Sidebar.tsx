// src/widgets/Sidebar/Sidebar.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLists } from '@/entities/List/model/fetchLists';
import { listsSelectors } from '@/entities/List/model/listsSlice';
import { List } from "@/shared/types/entities"
import { AppDispatch } from '@/app/providers/store/types';

export const Sidebar = () => {
  const dispatch: AppDispatch = useDispatch();
  const allLists: List[] = useSelector(listsSelectors.selectAll);

  useEffect(() => {
    // Запрашиваем списки при первом рендере сайдбара
    dispatch(fetchLists());
  }, [dispatch]);

  const sidebarStyles: React.CSSProperties = {
    width: '250px',
    borderRight: '1px solid #ccc',
    padding: '20px',
    height: '100vh',
    backgroundColor: '#f7f7f7'
  };

  return (
    <aside style={sidebarStyles}>
      <h3>Списки</h3>
      <ul>
        {allLists.map(list => (
          <li key={list.id}>{list.name}</li>
        ))}
      </ul>
    </aside>
  );
};