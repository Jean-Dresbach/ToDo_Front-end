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
    openModal(_, action: PayloadAction<ITask | undefined>) {
      if (action?.payload) {
        return { isOpen: true, dataInitialState: action.payload }
      } else {
        return { isOpen: true, dataInitialState: initialState.dataInitialState }
      }
    },
    closeModal() {
      return initialState
    }
  }
})

export const { openModal, closeModal } = taskModalSlice.actions
export default taskModalSlice.reducer
