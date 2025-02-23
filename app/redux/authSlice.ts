import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import { User } from "../types/user"

export interface AuthState {
    user: User | null;
    token: string | null;
}

const initialState: AuthState = {
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        loginSuccess: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
        },
    },
});
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
