import { useNavigate } from "react-router-dom"
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import { LogoutRounded } from "@mui/icons-material"

import {
  useAppDispatch,
  useAppSelector,
  toggleLoading,
  removeUserData,
  removeSession,
  removeTasks
} from "../redux"
import { useSnackbar } from "../hooks"
import { logout } from "../services/api"
import { ISession } from "../types/session"

export function LogoutItem() {
  const { csrfToken, userId } = useAppSelector(
    (state) => state.session
  ) as ISession
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { handleRenderSnackbar, handleOpenSnackbar } = useSnackbar()

  const handleLogout = async () => {
    dispatch(toggleLoading())

    const result = await logout(csrfToken, userId)

    dispatch(toggleLoading())

    if (result.code !== 200) {
      handleOpenSnackbar(result.message, "error")

      setTimeout(() => navigate("/login"), 2000)
    } else {
      handleOpenSnackbar(result.message)

      setTimeout(() => {
        dispatch(removeTasks())
        dispatch(removeUserData())
        dispatch(removeSession())
        navigate("/login")
      }, 2000)
    }
  }

  return (
    <MenuItem
      onClick={() => {
        handleLogout()
      }}
      sx={{ py: 2 }}
    >
      <ListItemIcon>
        <LogoutRounded />
      </ListItemIcon>
      <ListItemText>Sair</ListItemText>
      {handleRenderSnackbar()}
    </MenuItem>
  )
}
