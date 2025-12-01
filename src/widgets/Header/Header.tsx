import React from "react";
import { useCallback, useState } from "react";

import { Breadcrumbs, InputAdornment, Link, TextField, Typography } from "@mui/material";
import { List as MuiList, Box } from '@mui/material';
import { BellIcon, InfoIcon, SearchIcon, SettingsIcon, ThemeIcon, UserIcon } from "@/shared/ui/Icons/HeaderIcons";

import styleH from '@/app/styles/Header.module.scss'
import style from '@/app/styles/IconStyles.module.scss'
import { HeaderNavLink } from "@/shared/ui/HeaderNavLink";

const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">Test User</Link>,
    <Link underline="hover" key="2" color="inherit" href="/tasks">Tasks</Link>,
    <Typography key="3" color="text.primary">Today</Typography>,
];

export const Header = React.memo(() => {
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
                    <HeaderNavLink
                        path="/profile"
                        ItemIcon={<ThemeIcon className={style.navIconStyle + ' ' + style.allIconStyle} />}
                        isLogo={false}
                    />                    
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