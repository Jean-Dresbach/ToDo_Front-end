import { CssBaseline, ThemeProvider } from "@mui/material"

import { useAppSelector } from "./redux"
import { dark } from "./themes/dark"
import { light } from "./themes/light"

export function Root() {
  const currentTheme = useAppSelector((state) =>
    state.theme === "light" ? light : dark
  )

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
    </ThemeProvider>
  )
}
