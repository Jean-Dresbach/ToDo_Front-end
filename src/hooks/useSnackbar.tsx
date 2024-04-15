import { Alert, AlertColor, Snackbar } from "@mui/material"
import { useState } from "react"

const initialState = {
  isOpen: false,
  text: "",
  severity: "success" as AlertColor
}

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState(initialState)

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    setSnackbar(initialState)
  }

  const handleOpenSnackbar = (
    text: string,
    severity: AlertColor = "success"
  ) => {
    setSnackbar({ isOpen: true, text, severity })
  }

  const handleRenderSnackbar = () => {
    return (
      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={1500}
        onClose={handleClose}
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

  return { handleOpenSnackbar, handleRenderSnackbar }
}
