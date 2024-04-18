import { CssBaseline, ThemeProvider } from "@mui/material"

import { Router } from "./routes/Router"
import { useAppSelector } from "./redux"
import { LoadingBackdrop } from "./components"
import { dark } from "./themes/dark"
import { light } from "./themes/light"

export function Root() {
  const currentTheme = useAppSelector((state) =>
    state.theme === "light" ? light : dark
  )

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      <LoadingBackdrop />
      <Router />
    </ThemeProvider>
  )
}
