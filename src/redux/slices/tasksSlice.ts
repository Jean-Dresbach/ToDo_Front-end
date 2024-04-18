import { createSlice } from "@reduxjs/toolkit"

import { ITask } from "../../types/task"

const initialState: ITask[] = []

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTasks(_, action) {
      return action.payload
    },
    removeTasks() {
      return []
    }
  }
})

export const { addTasks, removeTasks } = tasksSlice.actions
export default tasksSlice.reducer
