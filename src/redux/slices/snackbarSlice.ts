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
    openSnackbar(_, actions: PayloadAction<IOpenSnackbar>) {
      return {
        isOpen: true,
        text: actions.payload.text,
        severity: actions.payload.severity
          ? actions.payload.severity
          : "success"
      }
    },
    closeSnackbar() {
      return initialState
    }
  }
})

export const { openSnackbar, closeSnackbar } = snackbarSlice.actions
export default snackbarSlice.reducer
