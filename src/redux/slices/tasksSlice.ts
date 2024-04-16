import { createSlice } from "@reduxjs/toolkit"

import { ITask } from "../../types/task"

const initialState: ITask[] | null = null

const tasksSlice = createSlice({
  name: "tasks",
  initialState: initialState as ITask[] | null,
  reducers: {
    addTask(_, action) {
      return action.payload
    },
    removeTasks() {
      return null
    }
  }
})

export const { addTask, removeTasks } = tasksSlice.actions
export default tasksSlice.reducer
