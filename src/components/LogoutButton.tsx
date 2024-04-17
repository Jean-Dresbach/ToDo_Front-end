import { useNavigate } from "react-router-dom"
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material"
import { LogoutRounded } from "@mui/icons-material"

import {
  useAppDispatch,
  useAppSelector,
  toggleLoading,
  removeUserData,
  removeSession,
  removeTasks,
  openSnackbar
} from "../redux"
import { logout } from "../services/api"
import { ISession } from "../types/session"

export function LogoutButton() {
  const { csrfToken, userId } = useAppSelector(
    (state) => state.session
  ) as ISession
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    dispatch(toggleLoading())

    const result = await logout(csrfToken, userId)

    dispatch(toggleLoading())

    if (result.code !== 200) {
      dispatch(openSnackbar({ text: result.message, severity: "error" }))

      setTimeout(() => navigate("/login"), 2000)
    } else {
      dispatch(openSnackbar({ text: result.message }))

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
    </MenuItem>
  )
}
