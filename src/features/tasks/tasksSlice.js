import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {
        taskList: JSON.parse(localStorage.getItem('tasks')) || [],
    },
    reducers: {
        addTask: (state, action) => {
            state.taskList.push(action.payload)
            localStorage.setItem('tasks', JSON.stringify(state.taskList))
            console.log(`task added`)
        },
        deleteTask: (state, action) => {
            state.taskList = state.taskList.filter((task) => task.id !== action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.taskList))
            console.log(`task deleted`)
        },
        updateTask: (state, action) => {
            const index = state.taskList.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
                state.taskList[index] = action.payload;
                localStorage.setItem('tasks', JSON.stringify(state.taskList))
                console.log(`task updated`)
            }
        },
        updateCompleteTask: (state, action) => {
            const index = state.taskList.findIndex((task) => task.id === action.payload)
            if (index !== -1) {
                state.taskList[index].completed = !state.taskList[index].completed
                localStorage.setItem('tasks', JSON.stringify(state.taskList))
                console.log('task completion status updated')
            }
        },

    },
});

export const { addTask, deleteTask, updateTask, updateCompleteTask, } = tasksSlice.actions;

export default tasksSlice.reducer;