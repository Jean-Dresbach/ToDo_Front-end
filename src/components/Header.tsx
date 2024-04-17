import { ComponentType } from "react"
import {
  Alert,
  Container,
  Divider,
  Slide,
  Snackbar,
  Typography,
  useTheme
} from "@mui/material"
import { Outlet, useLocation } from "react-router-dom"
import { Box } from "@mui/system"
import { TransitionProps } from "@mui/material/transitions"

import { useAppSelector, closeSnackbar, useAppDispatch } from "../redux"
import { ToggleMenuListButton } from "./ToggleMenuListButton"
import { ToggleThemeIconButton } from "./ToggleThemeIconButton"

export function Header() {
  const dispatch = useAppDispatch()
  const snackbar = useAppSelector((state) => state.snackbar)
  const themeMui = useTheme()
  const pathName = useLocation().pathname

  const user = useAppSelector((state) => state.user)

  const handleButttonView = () => {
    return pathName === "/" || (pathName === "/profile" && user) ? (
      <ToggleMenuListButton />
    ) : (
      <ToggleThemeIconButton />
    )
  }

  const handleClose = (_: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return
    }

    dispatch(closeSnackbar())
  }

  return (
    <Container
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "0 !important",
        boxShadow: 20,
        bgcolor: themeMui.palette.background.paper
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          p: 3
        }}
        component={"nav"}
      >
        <Typography variant="h1" fontSize={30} fontWeight={500}>
          ToDo App
        </Typography>

        {handleButttonView()}
      </Box>

      <Divider />

      <Outlet />

      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={1500}
        onClose={handleClose}
        TransitionComponent={Slide as ComponentType<TransitionProps>}
      >
        <Alert
          severity={snackbar.severity}
          sx={{ width: "100%", color: "white" }}
          variant="filled"
        >
          {snackbar.text}
        </Alert>
      </Snackbar>
    </Container>
  )
}
