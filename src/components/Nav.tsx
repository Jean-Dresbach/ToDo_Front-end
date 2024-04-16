import {
  Container,
  Divider,
  IconButton,
  Typography,
  useTheme
} from "@mui/material"
import { Outlet, useLocation } from "react-router-dom"
import { DarkMode, LightMode } from "@mui/icons-material"
import { Box } from "@mui/system"

import { MenuButton } from "./MenuButton"
import { setTheme, useAppDispatch, useAppSelector } from "../redux"

export function Nav() {
  const themeMui = useTheme()
  const pathName = useLocation().pathname
  const theme = useAppSelector((state) => state.theme)
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  function handleSetTheme(theme: "light" | "dark") {
    dispatch(setTheme(theme))
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

        {pathName !== "/" && (
          <IconButton
            onClick={() => handleSetTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <LightMode sx={{ fill: "black" }} />
            ) : (
              <DarkMode />
            )}
          </IconButton>
        )}

        {pathName === "/" && user && <MenuButton />}
      </Box>

      <Divider />

      <Outlet />
    </Container>
  )
}
