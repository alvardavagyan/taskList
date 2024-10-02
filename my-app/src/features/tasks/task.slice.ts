import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { InputTask, IState, ITask } from "./types";
import axios from "axios";

const initialState: IState = {
    list: []
}

export const getAllTasks = createAsyncThunk("tasks/get", async () => {
    const res = await axios.get("http://localhost:3004/tasks")
    return res.data
})

export const addTask = createAsyncThunk("tasks/post", async (param: InputTask) => {
    const res = await axios.post("http://localhost:3004/tasks", param)
    return res.data
})
export const deleteTask = createAsyncThunk("tasks/delete", async (id: string) => {
    const res = await axios.delete(`http://localhost:3004/tasks/${id}`)
    return res.data

})

export const updateTask = createAsyncThunk("tasks/patch", async (param: ITask) => {
    const res = await axios.patch(`http://localhost:3004/tasks/${param.id}`, param)
    return res.data
})

export const TaskSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(getAllTasks.fulfilled, (state, action) => {
                console.log(action)
                state.list = action.payload
            })
            .addCase(addTask.fulfilled, (state, action) => {
                state.list.push(action.payload)
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.list = state.list.filter(t => t.id !== action.payload)
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.list.find(t => t.id === action.payload)
            })
    }
})

export const reducer = TaskSlice.reducer