import { fetchUserSettings, updateUserSettings } from '@/app/services/settings/userApi';
import { UserSettings } from '@/shared/types/entities';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: UserSettings = {
    theme: 'light',
    backgroundGradient: ''
};

export const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light';
        },
        setSettings: (state, action: PayloadAction<Partial<UserSettings>>) => {
            Object.assign(state, action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(updateUserSettings.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
            })
            .addCase(fetchUserSettings.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
            })
    }
});

export const { toggleTheme, setSettings } = settingsSlice.actions;
export const settingsReducer = settingsSlice.reducer;