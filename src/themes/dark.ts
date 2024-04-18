import { createTheme } from "@mui/material"
import { grey } from "@mui/material/colors"

export const dark = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#212121"
    }
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: { background: grey[700], opacity: 1 },
        arrow: { color: grey[700] }
      }
    }
  }
})
