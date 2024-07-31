import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'authentication',
    initialState:
    {
        token: JSON.parse(localStorage.getItem("currentUser")) ? true : false,
        users: JSON.parse(localStorage.getItem("users")) || [
            {
                username: 'admin',
                password: 'password',
                userId: 1
            },
        ],
        currentUser: localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : null
    },
    reducers: {
        login: (state, action) => {
            const { username, password } = action.payload;
            for (const user of state.users) {
                if (user.username === username && user.password === password) {
                    state.token = true;
                    state.currentUser = username;
                    localStorage.setItem("currentUser", JSON.stringify(user.username));
                }
            }
        },
        signUp: (state, action) => {
            const { username, password } = action.payload;
            const existingUserIndex = state.users.findIndex(user => user.username === username);
            if (existingUserIndex === -1) {
                state.users.push({ username, password, userId: state.users.length > 0 ? Math.max(...state.users.map(user => user.userId)) + 1 : 1 });
                state.currentUser = state.users.find(user => user.username === username).username
                state.token = true;
                localStorage.setItem("users", JSON.stringify(state.users));
                localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
            }
        },
        logout: (state) => {
            state.token = false;
            state.currentUser = null;
            localStorage.removeItem("currentUser");
        }
    }
})

export const { login, signUp, logout } = authSlice.actions;

export default authSlice.reducer;