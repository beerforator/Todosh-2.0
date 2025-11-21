import { Avatar, Breadcrumbs, InputAdornment, Link, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { List as MuiList, Box } from '@mui/material';

const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">Test User</Link>,
    <Link underline="hover" key="2" color="inherit" href="/tasks">Tasks</Link>,
    <Typography key="3" color="text.primary">Today</Typography>,
];

import Brightness4Icon from '@mui/icons-material/Brightness4';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import styleH from '@/app/styles/Header.module.scss'
import style from '@/app/styles/IconStyles.module.scss'
import { BellIcon, InfoIcon, SearchIcon, SettingsIcon, ThemeIcon, UserIcon } from "@/shared/ui/Icons/HeaderIcons";
import { MemoizedTextField } from "@/shared/ui/MemoizedTextField";
import { useCallback, useState } from "react";

export const Header = () => {
    const [searchValue, setSearchValue] = useState('')

    const handleSearchChange = useCallback((e: any) => {
        setSearchValue(e.target.value)
    }, [])

    const clearSearchValue = useCallback(() => {
        setSearchValue('')
    }, [])

    return (
        <header className={styleH.header_inner}>
            <div className={styleH.breadcrumbs_container}>
                <Breadcrumbs separator="›" aria-label="breadcrumb">
                    {breadcrumbs}
                </Breadcrumbs>
            </div>
            <Box className={'paperBlock ' + styleH.headerPaperBlock}>
                <MuiList component="nav" className={styleH.nav}>
                    {/* <TextField
                        size="small"
                        placeholder="Search..."
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                        }}
                    /> */}

                    <Box component="form">
                        <TextField
                            size="small"
                            placeholder="Search..."
                            value={searchValue}
                            onChange={handleSearchChange}
                            onBlur={clearSearchValue}
                            InputProps={{
                                endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                            }}
                        />
                    </Box>
                    <NavLink
                        to="/dashboard"
                        className={styleH.navLink}
                    >
                        <div className={style.iconContainer}>
                            <InfoIcon className={style.navIconStyle + ' ' + style.allIconStyle} />
                        </div>
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        className={styleH.navLink}
                    >
                        <div className={style.iconContainer}>
                            <BellIcon className={style.navIconStyle + ' ' + style.allIconStyle} />
                        </div>
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        className={styleH.navLink}
                    >
                        <div className={style.iconContainer}>
                            <ThemeIcon className={style.navIconStyle + ' ' + style.allIconStyle} />
                        </div>
                    </NavLink>
                    <NavLink
                        to="/dashboard"
                        className={styleH.navLink}
                    >
                        <div className={style.iconContainer}>
                            <SettingsIcon className={style.navIconStyle + ' ' + style.allIconStyle} />
                        </div>
                    </NavLink>
                    <NavLink
                        to="/profile"
                        className={styleH.navLink + ' ' + styleH.navLinkUser}
                    >
                        <div className={style.iconContainer}>
                            <UserIcon className={style.userIconStyle + ' ' + style.allIconStyle} />
                        </div>
                    </NavLink>
                </MuiList>
            </Box>
        </header>
    );
};