import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'checking', //Checking, not-authenticsated, authenticated
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        login: (state, { payload }) => {
            console.log("state: ", state)
            console.log("payload ", payload)

            state.status = 'authenticated'; //Checking, not-authenticsated, authenticated
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;

        },
        logout: (state, { payload }) => {

            console.log(payload)
            state.status = 'not-authenticated'; //Checking, not-authenticsated, authenticated
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload.errorMessage;

        },
        checkingCredentials: (state) => {
            state.status = 'Checking'
        }
    }
});
export const { login, logout, checkingCredentials } = authSlice.actions;