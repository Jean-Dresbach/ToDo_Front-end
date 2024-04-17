import { createSlice } from "@reduxjs/toolkit"

import { ITask } from "../../types/task"

const initialState: ITask[] = []

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(_, action) {
      return action.payload
    },
    removeTasks() {
      return []
    }
  }
})

export const { addTask, removeTasks } = tasksSlice.actions
export default tasksSlice.reducer
