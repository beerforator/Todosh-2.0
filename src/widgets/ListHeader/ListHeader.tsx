import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/app/providers/store/types';
import { listsSelectors, selectList } from '@/app/providers/store/slices/listsSlice';
import { Box, Typography, IconButton, Menu, MenuItem, TextField, CircularProgress, Popover, ListItemIcon, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { updateListApi } from '@/app/services/listServices/updateListApi';
import { TAG_COLORS } from '@/shared/config/colors';
import PaletteIcon from '@mui/icons-material/Palette'; // Иконка для цвета
import { deleteListApi } from '@/app/services/listServices/deleteListApi';
import { useApiRequest } from '@/shared/hooks/useApiRequest';

import AllInboxIcon from '@mui/icons-material/AllInbox';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import { ListCircleIcon } from '@/shared/ui/ListCircleIcon';

import style from '@/app/styles/IconStyles.module.scss'
import styleT from '@/app/styles/TasksPage.module.scss'
import styleMC from '@/app/styles/MainContentStyles/MainContent.module.scss'

import { AllTasksIcon, InboxIcon, TodayIcon } from '@/shared/ui/Icons/SidebarIcons';
import { MoreIcon } from '@/shared/ui/Icons/HeaderIcons';
import { SMART_LIST_IDS, SMART_LISTS } from '@/shared/config/smartLists';

export const ListHeader = React.memo(() => {
    const dispatch: AppDispatch = useDispatch();

    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);
    const selectedList = useSelector((state: RootState) =>
        selectedListId ? listsSelectors.selectById(state, selectedListId) : undefined
    );

    const [isEditing, setIsEditing] = useState(false);
    const [listName, setListName] = useState('');
    const [colorPickerAnchorEl, setColorPickerAnchorEl] = useState<null | HTMLElement>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isLoading, setIsLoading] = useState(false)

    const [setUpdateList, isSettingUpdateList] = useApiRequest(updateListApi, {})

    const isMenuOpen = Boolean(anchorEl);

    useEffect(() => {
        if (selectedList) {
            setListName(selectedList.name);
        }
        setIsEditing(false);
    }, [selectedList]);

    const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleRename = () => {
        console.log('REANEM')
        handleCloseMenu();

        setTimeout(() => {
            setIsEditing(true)
        }, 0)
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setListName(e.target.value);
    };

    const handleDelete = async () => {
        if (!selectedList) return;

        if (window.confirm(`Вы уверены, что хотите удалить список "${selectedList.name}" и все задачи в нем?`)) {
            setIsLoading(true);
            try {
                await dispatch(deleteListApi(selectedList.id)).unwrap();
                dispatch(selectList(SMART_LIST_IDS.ALL));
            } catch (error) {
                console.error('Failed to delete list:', error);
            } finally {
                setIsLoading(false);
                handleCloseMenu();
            }
        }
    };

    const handleNameBlur = async () => {
        if (!selectedList || selectedList?.name === listName.trim() || listName.trim() === "") {
            setIsEditing(false);
            if (selectedList)
                setListName(selectedList.name)
            return;
        }

        const payload = {
            id: selectedList.id,
            changes: { name: listName.trim() }
        }

        setUpdateList(payload)

        setIsEditing(false);
    };

    const handleOpenColorPicker = (event: React.MouseEvent<HTMLElement>) => {
        setColorPickerAnchorEl(event.currentTarget);
    };
    const handleCloseColorPicker = () => {
        setColorPickerAnchorEl(null);
    };
    const handleColorSelect = (color: string) => {
        if (!selectedList) return;

        const payload = {
            id: selectedList.id,
            changes: { color }
        }
        setUpdateList(payload)

        handleCloseColorPicker();
        handleCloseMenu();
    };

    if (selectedListId === SMART_LIST_IDS.ALL) {
        return (
            <>
                <ListItemIcon>
                    <AllTasksIcon className={style.filterIconStyle + ' ' + style.allIconStyle} />
                </ListItemIcon>
                <Typography variant="h4" gutterBottom>{SMART_LISTS[0].label}</Typography>
            </>
        )
    }

    if (selectedListId === 'list-inbox') {
        return (
            <>
                <ListItemIcon>
                    <InboxIcon className={style.filterIconStyle + ' ' + style.allIconStyle} />
                </ListItemIcon>
                <Typography variant="h4" gutterBottom>Inbox</Typography>
            </>
        );
    }

    if (selectedListId === SMART_LIST_IDS.TODAY) {
        return (
            <>
                <ListItemIcon>
                    <TodayIcon className={style.filterIconStyle + ' ' + style.allIconStyle} />
                </ListItemIcon>
                <Typography variant="h4" gutterBottom>{SMART_LISTS[1].label}</Typography>
            </>
        )
    }

    if (!selectedList) {
        return <Typography variant="h4" gutterBottom>Загрузка...</Typography>
    }

    return (
        <>
            {isLoading && <CircularProgress size={32} sx={{ mr: 1 }} />}
            <ListCircleIcon color={selectedList.color} />
            {isEditing ? (
                <TextField
                    value={listName}
                    onChange={handleNameChange}
                    onBlur={handleNameBlur}
                    onKeyDown={(e) => e.key === 'Enter' && handleNameBlur()}
                    autoFocus
                    variant="standard"
                    sx={{ flexGrow: 1, '& .MuiInput-input': { fontSize: 'h4.fontSize' } }}
                    disabled={isLoading}
                />
            ) : (
                <Typography variant="h4" gutterBottom sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => !isLoading && setIsEditing(true)}>
                    {selectedList.name}
                </Typography>
            )}

            <IconButton onClick={handleOpenMenu} disabled={isLoading}>
                <MoreIcon />
            </IconButton>

            <Menu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleCloseMenu}
            >
                <MenuItem onClick={handleRename}>Переименовать</MenuItem>
                <MenuItem onClick={handleOpenColorPicker}>
                    <ListItemIcon><PaletteIcon fontSize="small" /></ListItemIcon>
                    <ListItemText>Изменить цвет</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>Удалить</MenuItem>
            </Menu>

            <Popover
                open={Boolean(colorPickerAnchorEl)}
                anchorEl={colorPickerAnchorEl}
                onClose={handleCloseColorPicker}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Box sx={{ display: 'block', p: 1, gap: 1 }}>
                    {TAG_COLORS.map(color => (
                        <IconButton
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: color,
                                border: selectedList?.color === color ? '2px solid #000' : '2px solid transparent',
                                '&:hover': {
                                    backgroundColor: color,
                                    opacity: 0.8
                                }
                            }}
                        />
                    ))}
                </Box>
            </Popover>
        </>
    );
})