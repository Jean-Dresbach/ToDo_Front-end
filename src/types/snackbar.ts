import { AlertColor } from "@mui/material"

export interface ISnackbar {
  isOpen: boolean
  text: string
  severity: AlertColor
}

export interface IOpenSnackbar {
  text: string
  severity?: AlertColor
}
