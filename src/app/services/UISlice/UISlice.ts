import React from "react"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

type PaneMode = 'temporary' | 'persistent'

interface UIState {
    editingTaskId: string | null,
    detailsPaneMode: PaneMode;
}

const initialState: UIState = {
    editingTaskId: null,
    detailsPaneMode: 'temporary'
}

export const UISlice = createSlice({
    name: 'ui',
    initialState: initialState,
    reducers: {
        startEditingTask: (state, action: PayloadAction<{ taskId: string, mode: PaneMode }>) => {
            state.editingTaskId = action.payload.taskId
            state.detailsPaneMode = action.payload.mode
        },
        stopEditingTask: (state) => {
            state.editingTaskId = null
        }
    }
})

export const {startEditingTask, stopEditingTask} = UISlice.actions

export const uiReducer = UISlice.reducer