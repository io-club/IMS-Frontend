import {createSlice} from "@reduxjs/toolkit";
import {AppState} from "./index";

export interface AuthState {
    initiated: boolean
}

export const initialState: AuthState = {
    initiated: false
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initiate(state) {
            state.initiated = true
        },
        revoke(state) {
            state.initiated = false
        }
    }
})

export const {initiate, revoke} = authSlice.actions
export const getAuthState = (state: AppState) => state.auth
export default authSlice.reducer