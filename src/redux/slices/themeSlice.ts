import { PayloadAction, createSlice } from "@reduxjs/toolkit"

const initialState: string = "light"

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme(_, action: PayloadAction<"light" | "dark">) {
      return action.payload
    }
  }
})

export const { setTheme } = themeSlice.actions
export default themeSlice.reducer
