import { createTheme } from "@mui/material"
import { grey } from "@mui/material/colors"

export const light = createTheme({
  palette: {
    mode: "light"
  },
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: { background: grey[600], opacity: 1 },
        arrow: { color: grey[600] }
      }
    }
  }
})
