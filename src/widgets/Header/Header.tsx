import React from "react";
import { useCallback, useState } from "react";

import { Breadcrumbs, InputAdornment, Link, ListItemText, Menu, MenuItem, TextField, Typography } from "@mui/material";
import { List as MuiList, Box } from '@mui/material';
import { BellIcon, InfoIcon, SearchIcon, SettingsIcon, ThemeIcon, UserIcon } from "@/shared/ui/Icons/HeaderIcons";

import styleH from '@/app/styles/Header.module.scss'
import style from '@/app/styles/IconStyles.module.scss'
import { HeaderNavLink } from "@/shared/ui/HeaderNavLink";
import { setSettings, toggleTheme } from "@/app/providers/store/slices/settingsSlice";
import { AppDispatch, RootState } from "@/app/providers/store/types";
import { useDispatch, useSelector } from "react-redux";
import { updateUserSettings } from "@/app/services/settings/userApi";
import { GRADIENTS } from "@/shared/config/colors";

const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">Test User</Link>,
    <Link underline="hover" key="2" color="inherit" href="/tasks">Tasks</Link>,
    <Typography key="3" color="text.primary">Today</Typography>,
];

export const Header = React.memo(() => {
    const dispatch: AppDispatch = useDispatch()
    const [searchValue, setSearchValue] = useState('')

    const themeMode = useSelector((state: RootState) => state.settings.theme);
    const currentGradient = useSelector((state: RootState) => state.settings.backgroundGradient);
    const [gradientAnchorEl, setGradientAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(gradientAnchorEl);


    const handleOpenGradientMenu = (event: React.MouseEvent<HTMLElement>) => {
        setGradientAnchorEl(event.currentTarget);
    };

    const handleCloseGradientMenu = () => {
        setGradientAnchorEl(null);
    };

    const handleGradientSelect = (gradient: string) => {
        dispatch(setSettings({ backgroundGradient: gradient }));
        dispatch(updateUserSettings({ backgroundGradient: gradient }));
        handleCloseGradientMenu();
    }

    const handleThemeToggle = () => {
        const newTheme = themeMode === 'light' ? 'dark' : 'light';
        dispatch(toggleTheme());
        dispatch(updateUserSettings({ theme: newTheme }));
    };

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
                    <HeaderNavLink
                        path="/profile"
                        ItemIcon={<InfoIcon className={style.navIconStyle + ' ' + style.allIconStyle} />}
                        isLogo={false}
                    />
                    <HeaderNavLink
                        path="/profile"
                        ItemIcon={<BellIcon className={style.navIconStyle + ' ' + style.allIconStyle} />}
                        isLogo={false}
                    />
                    <button
                        onClick={handleThemeToggle}
                    // path="/profile"
                    // ItemIcon={<ThemeIcon className={style.navIconStyle + ' ' + style.allIconStyle} />}
                    // isLogo={false}
                    >theme</button>

                    <button onClick={handleOpenGradientMenu}>
                        gradient
                    </button>

                    <Menu
                        anchorEl={gradientAnchorEl}
                        open={isMenuOpen}
                        onClose={handleCloseGradientMenu}
                    >
                        {GRADIENTS.map((gradient) => (
                            <MenuItem
                                key={gradient.name}
                                onClick={() => handleGradientSelect(gradient.value)}
                                selected={currentGradient === gradient.value}
                            >
                                <Box
                                    sx={{
                                        width: 24,
                                        height: 24,
                                        borderRadius: '50%',
                                        background: gradient.value || '#fff',
                                        border: '1px solid #ccc',
                                        mr: 2
                                    }}
                                />
                                <ListItemText>{gradient.name}</ListItemText>
                            </MenuItem>
                        ))}
                    </Menu>

                    <HeaderNavLink
                        path="/profile"
                        ItemIcon={<SettingsIcon className={style.navIconStyle + ' ' + style.allIconStyle} />}
                        isLogo={false}
                    />
                    <HeaderNavLink
                        path="/profile"
                        ItemIcon={<UserIcon className={style.userIconStyle + ' ' + style.allIconStyle} />}
                        isLogo={true}
                    />

                </MuiList>
            </Box>
        </header>
    );
})