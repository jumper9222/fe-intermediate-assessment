import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authentication/authSlice';
import tasksReducer from './features/tasks/tasksSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        tasks: tasksReducer,
    }
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem('tasks', JSON.stringify(state.tasks.taskList))
    localStorage.setItem('users', JSON.stringify(state.auth.users))
    localStorage.setItem('currentUser', JSON.stringify(state.auth.currentUser))
});

export default store;