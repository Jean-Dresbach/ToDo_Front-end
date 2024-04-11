import { Alert, AlertColor, Snackbar } from "@mui/material"
import { useState } from "react"

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    text: "",
    severity: "success" as AlertColor
  })

  const toggleSnackbar = async (
    text: string = "",
    severity: AlertColor = "success"
  ) => {
    setSnackbar((prevState) => ({ isOpen: !prevState.isOpen, text, severity }))
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  const handleShowSnackbar = () => {
    return (
      snackbar.isOpen && (
        <Snackbar
          open={snackbar.isOpen}
          onClose={() =>
            setSnackbar({ isOpen: false, text: "", severity: "success" })
          }
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
    )
  }

  return { toggleSnackbar, handleShowSnackbar }
}
