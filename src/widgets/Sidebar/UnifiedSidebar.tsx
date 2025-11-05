import React, { useEffect, useState } from 'react';
import { List as MuiList, ListItemButton, ListItemText, ListItemIcon, Collapse, Box, ListSubheader, Divider, Avatar, IconButton } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { ALL_TASKS_LIST_ID, listsSelectors, selectList, TODAY_TASKS_LIST_ID } from '@/app/providers/store/slices/listsSlice';
import { AppDispatch, RootState } from '@/app/providers/store/types';
import CircleIcon from '@mui/icons-material/Circle'; // Для иконок списков
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard'; // 2. Новые иконки
import LogoutIcon from '@mui/icons-material/Logout';

import AllInboxIcon from '@mui/icons-material/AllInbox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import { CreateListModal } from '@/features/CreateList/CreateListModal';
import { TAG_COLORS } from '@/shared/config/colors';
import { createListApi } from '@/app/services/listServices/createListApi';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { fetchListsApi } from '@/app/services/listServices/fetchListsApi';

export const UnifiedSidebar = () => {
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

    const handleListClick = (listId: string) => {
        if (listId === ALL_TASKS_LIST_ID)
        if (!location.pathname.startsWith("/tasks") && !location.pathname.startsWith("/calendar"))
            navigate('/tasks')
        dispatch(selectList(listId))
    }

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const sidebarWidth = isCollapsed ? '80px' : '250px'

    const sidebarStyles: React.CSSProperties = {
        width: sidebarWidth,
        borderRight: '1px solid #ccc',
        padding: '20px',
        height: '100vh',
        backgroundColor: '#f7f7f7',
        display: 'flex',
        flexDirection: 'column',
    };

    return (
        <Box sx={sidebarStyles}>
            <Box sx={{ flexGrow: 1, overflow: 'auto' }}>
                <MuiList component="nav">
                    <ListItemButton component={NavLink} to="/profile">
                        <ListItemIcon> <Avatar sx={{ width: 32, height: 32 }}>U</Avatar> </ListItemIcon>
                        {!isCollapsed && <ListItemText primary={"Some User"} />}
                    </ListItemButton>
                    <ListItemButton component={NavLink} to="/dashboard">
                        <ListItemIcon> <DashboardIcon /> </ListItemIcon>
                        {!isCollapsed && <ListItemText primary={"Dashboard"} />}
                    </ListItemButton>
                    <ListItemButton component={NavLink} to="/calendar">
                        <ListItemIcon> <CalendarMonthIcon /> </ListItemIcon>
                        {!isCollapsed && <ListItemText primary={"Calendar"} />}
                    </ListItemButton>
                    <ListItemButton component={NavLink} to="/tasks">
                        <ListItemIcon> <InboxIcon /> </ListItemIcon>
                        {!isCollapsed && <ListItemText primary={"Tasks"} />}
                    </ListItemButton>

                    <Divider sx={{ my: 2 }} />

                    <ListItemButton
                        selected={selectedListId === ALL_TASKS_LIST_ID}
                        onClick={() => handleListClick(ALL_TASKS_LIST_ID)}
                    >
                        <ListItemIcon><AllInboxIcon /></ListItemIcon>
                        {!isCollapsed && <ListItemText primary="Все задачи" />}
                    </ListItemButton>

                    <ListItemButton
                        selected={selectedListId === TODAY_TASKS_LIST_ID}
                        onClick={() => handleListClick(TODAY_TASKS_LIST_ID)}
                    >
                        <ListItemIcon><WbSunnyOutlinedIcon /></ListItemIcon>
                        <ListItemText primary="Сегодня" />
                    </ListItemButton>

                    {
                        allList.map(list => (
                            <>
                                <ListItemButton
                                    key={list.id}
                                    // sx={{ pl: 4 }}
                                    selected={(location.pathname.startsWith('/tasks') || location.pathname.startsWith('/calendar')) && list.id === selectedListId}
                                    onClick={() => handleListClick(list.id)}
                                >
                                    <ListItemIcon><CircleIcon fontSize="small" sx={{ color: list.color }} /></ListItemIcon>
                                    {!isCollapsed && <ListItemText primary={list.name} />}
                                </ListItemButton>
                                {list.name === "Inbox" && <Divider sx={{ my: 2 }} />}
                            </>
                        ))
                    }

                    <IconButton onClick={handleOpenModal} size="small">
                        <AddCircleOutlineIcon />
                    </IconButton>

                </MuiList>
            </Box >
            <Box>
                <Button onClick={() => setIsCollapsed(!isCollapsed)}>
                    {isCollapsed ? <LastPageRoundedIcon /> : <FirstPageRoundedIcon />}
                </Button>
                <ListItemButton onClick={() => { console.log('Loged Out') }}>
                    <ListItemIcon> <LogoutIcon /> </ListItemIcon>
                    {!isCollapsed && <ListItemText primary={"Log Out"} />}
                </ListItemButton>
            </Box>
            {isModalOpen &&
                <CreateListModal
                    onClose={handleCloseModal}
                />
            }
        </Box>
    )
}