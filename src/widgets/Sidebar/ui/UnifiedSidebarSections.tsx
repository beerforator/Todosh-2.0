import { ListCircleIcon } from "@/shared/ui/ListCircleIcon";
import { ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { List } from "@/shared/types/entities";

import style from '@/app/styles/IconStyles.module.scss'
import styleS from '@/app/styles/UnifiedSidebar.module.scss'

import {
    LogoIcon, DashboardPageIcon, CalendarPageIcon, TasksPageIcon,
    AllTasksIcon, TodayIcon, InboxIcon, AddPlusIcon, ChevronLIcon
} from '@/shared/ui/Icons/SidebarIcons';
import { SMART_LIST_IDS } from "@/shared/config/smartLists";

export const MemoizedNavLinks = React.memo(({ isCollapsed }: any) => {
    return (
        <>
            <NavLink
                to="/"
                className={styleS.navLink + ' ' + styleS.navLinkLogo}
            >
                <div className={style.iconContainer}>
                    <LogoIcon className={style.logoIconStyle + ' ' + style.allIconStyle} />
                </div>
                {!isCollapsed && <ListItemText className={styleS.navItemText} primary={"Todosh"}
                    primaryTypographyProps={{
                        style: { fontWeight: '600' }
                    }}
                />}
            </NavLink>
            <NavLink
                to="/dashboard"
                className={styleS.navLink}
            >
                <div className={style.iconContainer}>
                    <DashboardPageIcon className={style.navIconStyle + ' ' + style.allIconStyle} />
                </div>
                {!isCollapsed && <ListItemText className={styleS.navItemText} primary={"Dashboard"} />}
            </NavLink>
            <NavLink
                to="/calendar"
                className={styleS.navLink}
            >
                <div className={style.iconContainer}>
                    <CalendarPageIcon className={style.navIconStyle + ' ' + style.allIconStyle} />
                </div>
                {!isCollapsed && <ListItemText className={styleS.navItemText} primary={"Calendar"} />}
            </NavLink>
            <NavLink
                to="/tasks"
                className={styleS.navLink}
            >
                <div className={style.iconContainer}>
                    <TasksPageIcon className={style.navIconStyle + ' ' + style.allIconStyle} />
                </div>
                {!isCollapsed && <ListItemText className={styleS.navItemText} primary={"Tasks"} />}
            </NavLink>
        </>
    );
});


export const MemoizedFilterList = React.memo(({ allList, selectedListId, isCollapsed, handleListClick, handleOpenModal }: any) => {
    return (
        <>
            <FilterItem
                label="All Tasks"
                listId={SMART_LIST_IDS.ALL}
                ItemIcon={<AllTasksIcon className={style.filterIconStyle + ' ' + style.allIconStyle} />}
                isSelected={selectedListId === SMART_LIST_IDS.ALL}
                isCollapsed={isCollapsed}
                onClick={handleListClick}
            />

            <FilterItem
                label="Today"
                listId={SMART_LIST_IDS.TODAY}
                ItemIcon={<TodayIcon className={style.filterIconStyle + ' ' + style.allIconStyle} />}
                isSelected={selectedListId === SMART_LIST_IDS.TODAY}
                isCollapsed={isCollapsed}
                onClick={handleListClick}
            />

            <FilterItem
                label="Inbox"
                listId={"list-inbox"}
                ItemIcon={<InboxIcon className={style.filterIconStyle + ' ' + style.allIconStyle} />}
                isSelected={selectedListId === "list-inbox"}
                isCollapsed={isCollapsed}
                onClick={handleListClick}
            />

            <div
                className={
                    isCollapsed
                        ? styleS.divider_collapsed + ' ' + styleS.divider
                        : styleS.divider
                }
            ></div>

            {
                allList.map((list: List) => (
                    list.id === "list-inbox"
                        ? <></>
                        : <FilterItem
                            key={list.id}
                            listId={list.id}
                            isSelected={list.id === selectedListId}
                            isCollapsed={isCollapsed}
                            onClick={handleListClick}
                            ItemIcon={<ListCircleIcon color={list.color} />}
                            label={list.name}
                        />
                ))
            }
            <div
                onClick={() => handleOpenModal()}
                className={styleS.filterItemButton}
                style={{ opacity: .8 }}
            >
                <ListItemIcon>
                    <AddPlusIcon className={style.filterIconStyle + ' ' + style.allIconStyle} />
                </ListItemIcon>
                {!isCollapsed && <ListItemText className={styleS.navItemText} primary={"Add List"} />}
            </div>
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
        <div
            key={listId}
            onClick={() => onClick(listId)}
            className={isSelected
                ? (styleS.filterItemButton + ' ' + styleS.activeFilter)
                : styleS.filterItemButton
            }
        >
            <ListItemIcon>
                {ItemIcon}
            </ListItemIcon>
            {!isCollapsed && <ListItemText
                primaryTypographyProps={{
                    className: styleS.navItemText
                }}
                primary={label}
            />}
        </div >
    );
});


export const MemoizedSidebarFooter = React.memo(({ isCollapsed, onToggle }: any) => {
    return (
        <button
            onClick={onToggle}
            className={isCollapsed
                ? (styleS.buttonToCollapse + ' ' + styleS.buttonToCollapse_collapsed)
                : styleS.buttonToCollapse}
        >
            <div className={style.chevron_container}>
                <ChevronLIcon className={style.chevronStyle} />
            </div>
        </button>
    );
});