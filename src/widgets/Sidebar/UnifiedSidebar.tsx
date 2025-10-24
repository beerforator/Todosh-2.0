import React, { useEffect, useState } from 'react';
import { List as MuiList, ListItemButton, ListItemText, ListItemIcon, Collapse, Box, ListSubheader, Divider, Avatar } from '@mui/material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { listsSelectors, selectList } from '@/entities/List/model/listsSlice';
import { AppDispatch, RootState } from '@/app/providers/store/types';
import { fetchLists } from '@/entities/List/model/fetchLists';
import CircleIcon from '@mui/icons-material/Circle'; // Для иконок списков
import Button from '@mui/material/Button';
import DashboardIcon from '@mui/icons-material/Dashboard'; // 2. Новые иконки
import LogoutIcon from '@mui/icons-material/Logout';

import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';

export const UnifiedSidebar = () => {
    const dispatch: AppDispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const allList = useSelector(listsSelectors.selectAll)
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId)

    // const [isTasksOpen, setIsTasksOpen] = useState(true)

    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        dispatch(fetchLists())
    }, [dispatch])

    const handleListClick = (listId: string) => {
        if (!location.pathname.startsWith("/tasks") && !location.pathname.startsWith("/calendar"))
            navigate('/tasks')
        dispatch(selectList(listId))
    }

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
                    {/* <ListSubheader component="div">Nav</ListSubheader> */}
                    <ListItemButton component={NavLink} to="/profile">
                        <ListItemIcon> <Avatar sx={{ width: 32, height: 32 }}>TU</Avatar> </ListItemIcon>
                        {!isCollapsed && <ListItemText primary={"*Test User*"} />}
                    </ListItemButton>
                    <ListItemButton component={NavLink} to="/dashboard">
                        <ListItemIcon> <DashboardIcon /> </ListItemIcon>
                        {!isCollapsed && <ListItemText primary={"Dashboard"} />}
                    </ListItemButton>
                    <ListItemButton component={NavLink} to="/tasks">
                        <ListItemIcon> <InboxIcon /> </ListItemIcon>
                        {!isCollapsed && <ListItemText primary={"Tasks"} />}
                    </ListItemButton>
                    <ListItemButton component={NavLink} to="/calendar">
                        <ListItemIcon> <CalendarMonthIcon /> </ListItemIcon>
                        {!isCollapsed && <ListItemText primary={"Calendar"} />}
                    </ListItemButton>

                    <Divider sx={{ my: 2 }} /> {/* Разделитель */}

                    {/* <ListSubheader component="div">Task lists</ListSubheader> */}
                    {
                        allList.map(list => (
                            <ListItemButton
                                key={list.id}
                                sx={{ pl: 4 }}
                                selected={(location.pathname.startsWith('/tasks') || location.pathname.startsWith('/calendar')) && list.id === selectedListId}
                                onClick={() => handleListClick(list.id)}
                            >
                                <ListItemIcon><CircleIcon fontSize="small" /></ListItemIcon>
                                {!isCollapsed && <ListItemText primary={list.name} />}
                            </ListItemButton>
                        ))
                    }


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
        </Box>
        // <aside style={sidebarStyles}>
        //     <MuiList component="nav">
        //         <ListItemButton component={NavLink} to="/calendar">
        //             <ListItemIcon> <CalendarMonthIcon /> </ListItemIcon>
        //             <ListItemText primary={"Calendar"} />
        //         </ListItemButton>

        //         <ListItemButton onClick={() => { setIsTasksOpen(!isTasksOpen) }}>
        //             <ListItemIcon> <InboxIcon /> </ListItemIcon>
        //             <ListItemText primary={"Tasks"} />
        //             {isTasksOpen ? <ExpandLess /> : <ExpandMore />}
        //         </ListItemButton>

        //         <Collapse in={isTasksOpen} timeout="auto" unmountOnExit>
        //             <MuiList component="div" disablePadding>
        //                 {
        //                     allList.map(list => (
        //                         <ListItemButton
        //                             key={list.id}
        //                             sx={{ pl: 4 }}
        //                             selected={location.pathname.startsWith('/tasks') && list.id === selectedListId}
        //                             onClick={() => handleListClick(list.id)}
        //                         >
        //                             <ListItemIcon><CircleIcon fontSize="small" /></ListItemIcon>
        //                             <ListItemText primary={list.name} />
        //                         </ListItemButton>
        //                     ))
        //                 }
        //             </MuiList>
        //         </Collapse>
        //     </MuiList>
        // </aside>
    )
}