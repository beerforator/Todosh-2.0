import { ALL_TASKS_LIST_ID, TODAY_TASKS_LIST_ID } from "@/app/providers/store/slices/listsSlice";
import { ListCircleIcon } from "@/shared/ui/ListCircleIcon";
import { Avatar, Box, Button, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard'; // 2. Новые иконки
import LogoutIcon from '@mui/icons-material/Logout';

import AllInboxIcon from '@mui/icons-material/AllInbox';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import FirstPageRoundedIcon from '@mui/icons-material/FirstPageRounded';
import LastPageRoundedIcon from '@mui/icons-material/LastPageRounded';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';

import InboxIcon from '@mui/icons-material/MoveToInbox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { List } from "@/shared/types/entities";

export const MemoizedNavLinks = React.memo(({ isCollapsed }: any) => {
    return (
        <>
            <ListItemButton component={NavLink} to="/">
                <ListItemIcon> T </ListItemIcon>
                {!isCollapsed && <ListItemText primary={"Todosh"} />}
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
        </>
    );
});


export const MemoizedFilterList = React.memo(({ allList, selectedListId, isCollapsed, handleListClick, handleOpenModal }: any) => {
    return (
        <>
            <FilterItem
                label="Все задачи"
                listId={ALL_TASKS_LIST_ID}
                ItemIcon={<AllInboxIcon />}
                isSelected={selectedListId === ALL_TASKS_LIST_ID}
                isCollapsed={isCollapsed}
                onClick={handleListClick}
            />

            <FilterItem
                label="Сегодня"
                listId={TODAY_TASKS_LIST_ID}
                ItemIcon={<WbSunnyOutlinedIcon />}
                isSelected={selectedListId === TODAY_TASKS_LIST_ID}
                isCollapsed={isCollapsed}
                onClick={handleListClick}
            />

            {
                allList.map((list: List) => (
                    <FilterItem
                        key={list.id}
                        listId={list.id}
                        isSelected={list.id === selectedListId}
                        isCollapsed={isCollapsed}
                        onClick={handleListClick}
                        ItemIcon={<ListCircleIcon color={list.color}/>}
                        label={list.name}
                    />
                ))
            }
            <ListItemButton onClick={() => handleOpenModal()}>
                <ListItemIcon>
                    <AddCircleOutlineIcon />
                </ListItemIcon>
                <ListItemText primary={"Add List"} />
            </ListItemButton>
        </>
    );
});


const FilterItem = React.memo((props: {
    listId: string,
    isSelected: boolean;
    isCollapsed: boolean;
    onClick: (id: string) => void,
    ItemIcon: React.ReactNode,
    label: string,
}) => {
    const { listId, isSelected, isCollapsed, onClick, ItemIcon, label } = props;

    return (
        <ListItemButton
            key={listId}
            selected={isSelected}
            onClick={() => onClick(listId)}
        >
            <ListItemIcon>
                {ItemIcon}
            </ListItemIcon>
            {!isCollapsed && <ListItemText primary={label} />}
        </ListItemButton>
    );
});


export const MemoizedSidebarFooter = React.memo(({ isCollapsed, onToggle }: any) => {
    return (
        <Box>
            <Button onClick={onToggle}>
                {isCollapsed ? <LastPageRoundedIcon /> : <FirstPageRoundedIcon />}
            </Button>
            {/* <ListItemButton onClick={() => { console.log('Loged Out') }}>
                <ListItemIcon> <LogoutIcon /> </ListItemIcon>
                {!isCollapsed && <ListItemText primary={"Log Out"} />}
            </ListItemButton> */}
        </Box>
    );
});