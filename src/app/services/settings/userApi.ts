import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseApi } from '@/shared/api/base';
import { RootState } from '@/app/providers/store/types';
import { User, UserSettings } from '@/shared/types/entities';

export const updateUserSettings = createAsyncThunk<UserSettings, Partial<UserSettings>>(
    'user/updateSettings',
    async (newSettingsFragment, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const currentSettings = state.settings;

        const updatedSettings = {
            ...currentSettings,
            ...newSettingsFragment
        };

        console.log(updatedSettings)

        try {
            await baseApi.patch(`users/user-1`, { settings: updatedSettings });

            return updatedSettings;
        } catch (error) {
            return rejectWithValue('Failed to update settings');
        }
    }
);

export const fetchUserSettings = createAsyncThunk<UserSettings>(
    'user/fetchSettings',
    async (_, { rejectWithValue }) => {
        try {
            const user = await baseApi.get<User>('users/user-1');
            return user.settings;
        } catch (error) {
            return rejectWithValue('Failed to fetch settings');
        }
    }
);