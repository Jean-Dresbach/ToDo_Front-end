import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { IOpenSnackbar, ISnackbar } from "../../types/snackbar"

const initialState: ISnackbar = {
  isOpen: false,
  text: "",
  severity: "success"
}

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    openSnackbar(_, action: PayloadAction<IOpenSnackbar>) {
      return {
        isOpen: true,
        text: action.payload.text,
        severity: action.payload.severity ? action.payload.severity : "success"
      }
    },
    closeSnackbar() {
      return initialState
    }
  }
})

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions
export default snackbarSlice.reducer
