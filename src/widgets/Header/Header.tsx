import { Avatar, Box, Breadcrumbs, InputAdornment, Link, ListItemButton, ListItemIcon, ListItemText, TextField, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";

const breadcrumbs = [
    <Link underline="hover" key="1" color="inherit" href="/">Test User</Link>,
    <Link underline="hover" key="2" color="inherit" href="/tasks">Tasks</Link>,
    <Typography key="3" color="text.primary">Today</Typography>,
];

import SearchIcon from '@mui/icons-material/Search';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SettingsIcon from '@mui/icons-material/Settings';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Header = () => {
    const headerStyles: React.CSSProperties = {
        padding: '12px 24px',
        backgroundColor: '#F7F8FA', // Примерный цвет фона
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid #E0E0E0',
    };

    return (
        <Box component="header" sx={headerStyles}>
            <Breadcrumbs separator="›" aria-label="breadcrumb">
                {breadcrumbs}
            </Breadcrumbs>

            <Box sx={headerStyles}>
                <TextField
                    size="small"
                    placeholder="Search..."
                    InputProps={{
                        endAdornment: <InputAdornment position="end"><SearchIcon /></InputAdornment>,
                    }}
                />
                <ListItemButton component={NavLink} to="/dashboard">
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                </ListItemButton>
                <ListItemButton component={NavLink} to="/dashboard">
                    <ListItemIcon><NotificationsNoneIcon /></ListItemIcon>
                </ListItemButton>
                <ListItemButton component={NavLink} to="/dashboard">
                    <ListItemIcon><Brightness4Icon /></ListItemIcon>
                </ListItemButton>
                <ListItemButton component={NavLink} to="/dashboard">
                    <ListItemIcon><SettingsIcon /></ListItemIcon>
                </ListItemButton>
                <ListItemButton component={NavLink} to="/profile">
                    <ListItemIcon> <Avatar sx={{ width: 32, height: 32 }}>U</Avatar> </ListItemIcon>
                    {/* <ListItemText primary={"Some User"} /> */}
                </ListItemButton>

            </Box>
        </Box>
    );
};