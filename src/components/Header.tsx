import { Container, Divider, Typography, useTheme } from "@mui/material"
import { Outlet, useLocation } from "react-router-dom"
import { Box } from "@mui/system"

import { ToggleMenuListButton } from "./ToggleMenuListButton"
import { useAppSelector } from "../redux"
import { ToggleThemeIconButton } from "./ToggleThemeIconButton"

export function Header() {
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
    </Container>
  )
}
