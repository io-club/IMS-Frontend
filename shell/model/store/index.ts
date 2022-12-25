import {configureStore} from "@reduxjs/toolkit";
import type {ConfigureStoreOptions} from "@reduxjs/toolkit";
import {authSlice} from "./auth";

const storeOptions: ConfigureStoreOptions = {
    reducer: {
        [authSlice.name]: authSlice.reducer
    }
}

export const store = configureStore(storeOptions)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
