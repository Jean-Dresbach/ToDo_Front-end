import { useAppDispatch, useAppSelector } from "../redux"
import { Container, IconButton, Typography } from "@mui/material"
import { toggleTheme } from "../redux/slices/themesSlice"
import { DarkMode, LightMode } from "@mui/icons-material"
import { Box } from "@mui/system"
import { Outlet } from "react-router-dom"

export function Nav() {
  const theme = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()

  function handleToggleTheme() {
    dispatch(toggleTheme())
  }

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: "column", height: "100%", p: 1 }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2
        }}
        component={"nav"}
      >
        <Typography variant="h1" fontSize={30} fontWeight={400}>
          ToDo App
        </Typography>

        <IconButton onClick={handleToggleTheme}>
          {theme === "light" ? (
            <LightMode sx={{ fill: "black" }} />
          ) : (
            <DarkMode />
          )}
        </IconButton>
      </Box>

      <Outlet />
    </Container>
  )
}
