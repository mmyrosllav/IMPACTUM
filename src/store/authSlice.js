import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        },
        registerUser: (state, action) => {
            const { name, email } = action.payload;
            const newUser = { name, email };
            state.user = newUser;
            state.token = 'new-fake-jwt-token';
            localStorage.setItem('user', JSON.stringify(newUser));
            localStorage.setItem('token', state.token);
        },
        // NEW: Логіка оновлення імені
        updateProfile: (state, action) => {
            if (state.user) {
                state.user.name = action.payload.name;
                localStorage.setItem('user', JSON.stringify(state.user));
            }
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});

export const { setCredentials, registerUser, updateProfile, logout } = authSlice.actions;
export default authSlice.reducer;