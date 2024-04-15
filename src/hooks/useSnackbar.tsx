import { Alert, AlertColor, Snackbar } from "@mui/material"
import { useState } from "react"

const initialState = {
  isOpen: false,
  text: "",
  severity: "success" as AlertColor
}

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState(initialState)

  const handleCloseSnackbar = () => {
    setSnackbar(initialState)
  }

  const toggleSnackbar = (text: string, severity: AlertColor = "success") => {
    setSnackbar({ isOpen: true, text, severity })
  }

  const handleShowSnackbar = () => {
    return (
      <Snackbar
        open={snackbar.isOpen}
        onClose={handleCloseSnackbar}
        autoHideDuration={1500}
      >
        <Alert
          severity={snackbar.severity}
          variant="outlined"
          sx={{ width: "100%" }}
        >
          {snackbar.text}
        </Alert>
      </Snackbar>
    )
  }

  return { toggleSnackbar, handleShowSnackbar }
}
