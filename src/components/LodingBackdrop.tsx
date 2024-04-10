import { Backdrop, CircularProgress } from "@mui/material"
import { useAppSelector } from "../redux"

export function LoadingBackdrop() {
  const isLoading = useAppSelector((state) => state.loading)

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}
