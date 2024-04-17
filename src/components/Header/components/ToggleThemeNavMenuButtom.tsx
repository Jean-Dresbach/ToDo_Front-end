import { DarkMode, DesktopWindowsRounded, LightMode } from "@mui/icons-material"
import { Box, Button, Typography } from "@mui/material"

import { setTheme, useAppDispatch, useAppSelector } from "../../../redux"

export function ToggleThemeNavMenuButtom() {
  const theme = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()

  function handleSetTheme(theme: "light" | "dark") {
    dispatch(setTheme(theme))
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        p: 2,
        gap: 1
      }}
    >
      <Box sx={{ width: "100%", display: "flex", gap: 1.5 }}>
        <DesktopWindowsRounded />
        <Typography alignSelf="start">Mode</Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant={theme === "light" ? "contained" : "text"}
          startIcon={<LightMode />}
          onClick={() => handleSetTheme("light")}
          sx={{ padding: theme !== "light" ? "6px 16px" : "" }}
        >
          Light
        </Button>

        <Button
          variant={theme === "dark" ? "contained" : "text"}
          startIcon={<DarkMode />}
          onClick={() => handleSetTheme("dark")}
          sx={{ padding: theme !== "dark" ? "6px 16px" : "" }}
        >
          Dark
        </Button>
      </Box>
    </Box>
  )
}
