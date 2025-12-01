import React, { useCallback, useEffect, useState } from 'react';
import { List as MuiList, Box } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { ALL_TASKS_LIST_ID, listsSelectors, selectList } from '@/app/providers/store/slices/listsSlice';
import { AppDispatch, RootState } from '@/app/providers/store/types';

import { CreateListModal } from '@/features/CreateList/CreateListModal';
import { fetchListsApi } from '@/app/services/listServices/fetchListsApi';
import { MemoizedFilterList, MemoizedNavLinks, MemoizedSidebarFooter } from './ui/UnifiedSidebarSections';

import style from '@/app/styles/UnifiedSidebar.module.scss'

export const UnifiedSidebar = React.memo(() => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const allList = useSelector(listsSelectors.selectAll)
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId)

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHover, setIsHover] = useState(false)


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
        
        // Костыль !!!
        setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 110);
    }, []);

    const handleHover = useCallback(() => {
        setIsHover(true)
    }, [])

    const handleUnHover = useCallback(() => {
        setIsHover(false)
    }, [])

    return (
        <Box
            onMouseEnter={handleHover}
            onMouseLeave={handleUnHover}
            className={
                isCollapsed
                    ? style.sidebarPaperBlock_collapsed + ' paperBlock ' + style.sidebarPaperBlock
                    : (style.sidebarPaperBlock + ' paperBlock')
            }
        >

            <Box className={style.sidebar_inner}>
                <MuiList component="nav" className={style.nav}>
                    <MemoizedNavLinks isCollapsed={isCollapsed} />

                    <div className={style.filter_container}>
                        <MemoizedFilterList
                            allList={allList}
                            selectedListId={selectedListId}
                            isCollapsed={isCollapsed}
                            handleListClick={handleListClick}
                            handleOpenModal={handleOpenModal}
                        />
                    </div>

                </MuiList>
            </Box >
            {isHover &&
                <div className={style.sidebar_wrapper}>
                    <div className={style.sidebarToCollapse}>
                        <MemoizedSidebarFooter
                            isCollapsed={isCollapsed}
                            onToggle={handleToggleCollapse}
                        />
                    </div>
                </div>
            }
            {isModalOpen &&
                <CreateListModal
                    onClose={handleCloseModal}
                />
            }
        </Box>
    )
})


