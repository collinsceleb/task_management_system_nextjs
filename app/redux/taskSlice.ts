import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Task} from "@/app/types/Task";


interface TaskStatus {
    tasks: Task[]
}

const initialState: TaskStatus = {
    tasks: []
}

const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        }
    }
});

export const { setTasks, updateTask, deleteTask, addTask } = taskSlice.actions;
export default taskSlice.reducer;