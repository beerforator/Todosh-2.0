import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '@/app/providers/store/types';
import { selectList } from '@/app/providers/store/slices/listsSlice';
import { SMART_LIST_IDS } from '@/shared/config/smartLists';

const SELECTED_LIST_KEY = 'selectedListId';

export const LocalStorageSync = () => {
    const dispatch: AppDispatch = useDispatch();
    const selectedListId = useSelector((state: RootState) => state.lists.selectedListId);

    useEffect(() => {
        const storedId = localStorage.getItem(SELECTED_LIST_KEY);
        if (storedId && storedId !== SMART_LIST_IDS.ALL) {
            dispatch(selectList(storedId));
        }
    }, [dispatch]);

    useEffect(() => {
        if (selectedListId) {
            localStorage.setItem(SELECTED_LIST_KEY, selectedListId);
        }
    }, [selectedListId]);

    return null;
};