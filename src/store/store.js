import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from "./auth"
import { journalSlice } from "./journal"
//Archivo principal donde se "guardan" nuestros reducers
export const store = configureStore({
    reducer: {
        authRedux: authSlice.reducer,
        journal: journalSlice.reducer,
    },
})