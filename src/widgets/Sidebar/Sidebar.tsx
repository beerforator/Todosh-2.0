// src/widgets/Sidebar/Sidebar.tsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchLists } from '@/entities/List/model/fetchLists';
import { listsSelectors, selectList } from '@/entities/List/model/listsSlice';
import { List } from "@/shared/types/entities"
import { AppDispatch, RootState } from '@/app/providers/store/types';
import { List as MuiList, ListItem, ListItemButton, ListItemText } from '@mui/material';

export const Sidebar = () => {
    const dispatch: AppDispatch = useDispatch();
    const allLists: List[] = useSelector(listsSelectors.selectAll);
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId)

    useEffect(() => {
        // Запрашиваем списки при первом рендере сайдбара
        dispatch(fetchLists());
    }, [dispatch]);

    const handleSelectList = (id: string) => {
        dispatch(selectList(id))
    }

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
            <MuiList>
                {allLists.map(list => (
                    <ListItem key={list.id} disablePadding>
                        <ListItemButton
                            onClick={() => handleSelectList(list.id)}
                            // 3. Подсвечиваем активный элемент
                            selected={list.id === selectedListId}
                        >
                            <ListItemText primary={list.name} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </MuiList>
        </aside>
    );
};