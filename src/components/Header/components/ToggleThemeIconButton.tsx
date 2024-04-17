import { DarkMode, LightMode } from "@mui/icons-material"
import { IconButton } from "@mui/material"

import { useAppSelector, useAppDispatch, setTheme } from "../../../redux"

export function ToggleThemeIconButton() {
  const theme = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()

  function handleSetTheme(theme: "light" | "dark") {
    dispatch(setTheme(theme))
  }

  return (
    <IconButton
      onClick={() => handleSetTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? <LightMode sx={{ fill: "black" }} /> : <DarkMode />}
    </IconButton>
  )
}
