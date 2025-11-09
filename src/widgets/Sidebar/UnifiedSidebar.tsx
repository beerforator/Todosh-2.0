import React, { useCallback, useEffect, useState } from 'react';
import { List as MuiList, Box, Divider } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';


import { useDispatch, useSelector } from 'react-redux';
import { ALL_TASKS_LIST_ID, listsSelectors, selectList } from '@/app/providers/store/slices/listsSlice';
import { AppDispatch, RootState } from '@/app/providers/store/types';

import { CreateListModal } from '@/features/CreateList/CreateListModal';
import { fetchListsApi } from '@/app/services/listServices/fetchListsApi';
import { MemoizedFilterList, MemoizedNavLinks, MemoizedSidebarFooter } from './ui/UnifiedSidebarSections';
import { Transform } from 'stream';

export const UnifiedSidebar = React.memo(() => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const allList = useSelector(listsSelectors.selectAll)
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId)

    const [isCollapsed, setIsCollapsed] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchListsApi())
    }, [dispatch])

    const handleListClick = useCallback((listId: string) => {
        if (listId === ALL_TASKS_LIST_ID)
            if (!location.pathname.startsWith("/tasks") && !location.pathname.startsWith("/calendar"))
                navigate('/tasks')
        dispatch(selectList(listId))
    }, [dispatch, location, navigate])

    const handleOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleToggleCollapse = useCallback(() => {
        setIsCollapsed(prev => !prev)
    }, []);

    const sidebarWidth = isCollapsed ? '80px' : '250px'

    const sidebarStyles: React.CSSProperties = {
        width: sidebarWidth,
        borderRight: '1px solid #ccc',
        padding: '20px',
        height: '100vh',
        backgroundColor: '#f7f7f7',
        display: 'flex',
        flexDirection: 'row',
    };

    return (
        <Box sx={sidebarStyles}>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <MuiList component="nav">
                    <MemoizedNavLinks isCollapsed={isCollapsed} />

                    <Divider sx={{ my: 2 }} />

                    <MemoizedFilterList
                        allList={allList}
                        selectedListId={selectedListId}
                        isCollapsed={isCollapsed}
                        handleListClick={handleListClick}
                        handleOpenModal={handleOpenModal}
                    />

                </MuiList>
            </Box >
            <MemoizedSidebarFooter style={{position: "absolute", transform: 'translate(-20, 30px)'}}
                isCollapsed={isCollapsed}
                onToggle={handleToggleCollapse}
            />
            {isModalOpen &&
                <CreateListModal
                    onClose={handleCloseModal}
                />
            }
        </Box>
    )
})


