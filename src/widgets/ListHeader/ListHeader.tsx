// src/widgets/ListHeader/ListHeader.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/app/providers/store/types';
import { ALL_TASKS_LIST_ID, listsSelectors, selectList } from '@/entities/List/model/listsSlice';
import { Box, Typography, IconButton, Menu, MenuItem, TextField, CircularProgress, Popover, ListItemIcon, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { deleteList } from '@/features/DeleteList/api/deleteList';
import { updateListApi } from '@/features/EditList/api/updateList';
import CircleIcon from '@mui/icons-material/Circle'; // Для иконок списков
import { TAG_COLORS } from '@/shared/config/colors';
import PaletteIcon from '@mui/icons-material/Palette'; // Иконка для цвета

export const ListHeader = () => {
    const dispatch: AppDispatch = useDispatch();

    // Получаем ID текущего списка и сам объект списка
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);
    const selectedList = useSelector((state: RootState) =>
        selectedListId ? listsSelectors.selectById(state, selectedListId) : undefined
    );

    // Состояние для редактирования названия
    const [isEditing, setIsEditing] = useState(false);
    const [listName, setListName] = useState('');

    const [colorPickerAnchorEl, setColorPickerAnchorEl] = useState<null | HTMLElement>(null);

    // Состояние для меню "три точки"
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const [isLoading, setIsLoading] = useState(false)

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
                await dispatch(deleteList(selectedList.id)).unwrap();
                // После успешного удаления, переключаемся на "Все задачи" для лучшего UX
                dispatch(selectList(ALL_TASKS_LIST_ID));
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
            return;
        }

        setIsLoading(true);
        try {
            await dispatch(updateListApi({
                id: selectedList.id,
                changes: { name: listName.trim() }
            })).unwrap()
        }
        catch (error) {
            console.error('Failed to update list:', error);
        }
        finally {
            setIsLoading(false);
            setIsEditing(false);
        }
    };

    const handleOpenColorPicker = (event: React.MouseEvent<HTMLElement>) => {
        setColorPickerAnchorEl(event.currentTarget);
        // handleCloseMenu(); // Закрываем основное меню
    };
    const handleCloseColorPicker = () => {
        setColorPickerAnchorEl(null);
    };
    const handleColorSelect = (color: string) => {
        if (!selectedList) return;
        // Диспатчим наш универсальный Thunk
        dispatch(updateListApi({ id: selectedList.id, changes: { color } }));
        handleCloseColorPicker();
        handleCloseMenu();
    };

    // ИСПРАВЛЕННАЯ ВЕРСИЯ:
    if (selectedListId === 'all') {
        return <Typography variant="h4" gutterBottom>Все задачи</Typography>;
    }

    if (selectedListId === 'list-inbox') {
        return <Typography variant="h4" gutterBottom>Inbox</Typography>;
    }

    // Показываем "Загрузку", только если ID есть, а самого объекта листа еще нет
    if (!selectedList) {
        return <Typography variant="h4" gutterBottom>Загрузка...</Typography>;
    }

    const modalStyles = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {isLoading && <CircularProgress size={32} sx={{ mr: 1 }} />}
            <CircleIcon sx={{ color: selectedList.color, mr: 1.5 }} />
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
                <MoreVertIcon />
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
                <Box sx={{ display: 'flex', p: 1, gap: 1 }}> {/* Добавил gap для отступов */}
                    {TAG_COLORS.map(color => (
                        <IconButton
                            key={color}
                            onClick={() => handleColorSelect(color)}
                            // 1. КОПИРУЕМ СТИЛИ ИЗ МОДАЛЬНОГО ОКНА ПРЯМО СЮДА
                            sx={{
                                width: 32,
                                height: 32,
                                backgroundColor: color,
                                // Добавляем подсветку для текущего цвета списка
                                border: selectedList?.color === color ? '2px solid #000' : '2px solid transparent',
                                // Убираем стандартное поведение затемнения при наведении для красоты
                                '&:hover': {
                                    backgroundColor: color,
                                    opacity: 0.8
                                }
                            }}
                        />
                    ))}
                </Box>
            </Popover>
        </Box>
    );
};