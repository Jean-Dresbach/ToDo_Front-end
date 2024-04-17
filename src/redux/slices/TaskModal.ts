import { PayloadAction, createSlice } from "@reduxjs/toolkit"

import { ITaskModal, ITask } from "../../types/task"

const initialState: ITaskModal = {
  isOpen: false,
  dataInitialState: {
    id: "",
    title: "",
    description: ""
  }
}

export const taskModalSlice = createSlice({
  name: "taskModal",
  initialState,
  reducers: {
    openModal(state, action: PayloadAction<ITask | null>) {
      if (action?.payload) {
        return { isOpen: true, dataInitialState: action.payload }
      } else {
        return { ...state, isOpen: true }
      }
    },
    closeModal() {
      return initialState
    }
  }
})
