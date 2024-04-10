import { Alert, Snackbar } from "@mui/material"
import { useState } from "react"

export function useSnackbar() {
  const [snackbar, setSnackbar] = useState({
    isOpen: false,
    text: ""
  })

  const toggleSnackbar = async (text: string = "") => {
    setSnackbar((prevState) => ({ isOpen: !prevState.isOpen, text }))
    await new Promise((resolve) => setTimeout(resolve, 2000))
  }

  const handleShowSnackbar = () => {
    return (
      snackbar.isOpen && (
        <Snackbar
          open={snackbar.isOpen}
          onClose={() => setSnackbar({ isOpen: false, text: "" })}
          autoHideDuration={1500}
        >
          <Alert severity="success" variant="outlined" sx={{ width: "100%" }}>
            {snackbar.text}
          </Alert>
        </Snackbar>
      )
    )
  }

  return { toggleSnackbar, handleShowSnackbar }
}
