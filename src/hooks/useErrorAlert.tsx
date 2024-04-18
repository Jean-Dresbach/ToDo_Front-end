import { Alert } from "@mui/material"
import { useState } from "react"

export function useErrorAlert() {
  const errorAlertInitialState = {
    isOpen: false,
    field: "",
    message: ""
  }

  const [errorAlert, setErrorAlert] = useState(errorAlertInitialState)

  const setErrorAlertoToIntialState = () => {
    setErrorAlert(errorAlertInitialState)
  }

  const handleShowErrorAlert = () => {
    return (
      errorAlert.isOpen && (
        <Alert severity="error" variant="filled">
          {errorAlert.message}
        </Alert>
      )
    )
  }

  return {
    errorAlert,
    setErrorAlertoToIntialState,
    handleShowErrorAlert,
    setErrorAlert
  }
}
