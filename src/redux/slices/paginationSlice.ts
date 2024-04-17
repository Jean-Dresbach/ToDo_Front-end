import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IPagination, PerPage } from "../../types/pagination"

const initialState: IPagination = {
  currentPage: 1,
  tasksPerPage: 5
}

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    changePage(state, action: PayloadAction<number>) {
      return { ...state, currentPage: action.payload }
    },
    changePerPage: (state, action: PayloadAction<PerPage>) => {
      return { ...state, tasksPerPage: action.payload }
    }
  }
})

export const { changePage, changePerPage } = paginationSlice.actions
export default paginationSlice.reducer
