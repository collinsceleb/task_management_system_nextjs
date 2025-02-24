import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { User } from "../types/user"

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.token = action.payload.token;
            state.isAuthenticated = true;
        },
        logoutSuccess: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
        },
    },
});
export const { loginSuccess, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;
