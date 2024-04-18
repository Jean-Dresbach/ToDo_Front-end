import { createSlice } from "@reduxjs/toolkit"

const loadingSlice = createSlice({
  name: "loading",
  initialState: false,
  reducers: {
    toggleLoading(state) {
      return !state
    }
  }
})

export const { toggleLoading } = loadingSlice.actions
export default loadingSlice.reducer
