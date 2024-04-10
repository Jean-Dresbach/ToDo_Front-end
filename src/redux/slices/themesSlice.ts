import { createSlice } from "@reduxjs/toolkit"

const initialState: string = "light"

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      return state === "light" ? "dark" : "light"
    }
  }
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
