import { createSlice } from '@reduxjs/toolkit';
export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: true,
    },
    reducers: {
        increment: (state, /* action */) => {
            state.counter += 1;
        },
    }
});
export const { increment } = journalSlice.actions;