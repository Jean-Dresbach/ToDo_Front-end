import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material"

// import { TaskForm } from "../components"
import {
  useAppDispatch,
  useAppSelector,
  toggleLoading,
  addUserData,
  openSnackbar
} from "../redux"
import { fetchUserData } from "../services/api"

export function Home() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const session = useAppSelector((state) => state.session)
  const user = useAppSelector((state) => state.user)

  useEffect(() => {
    if (!session) {
      navigate("/login")
    } else if (!user) {
      const handleGetUserData = async () => {
        dispatch(toggleLoading())

        const result = await fetchUserData(session.csrfToken, session.userId)

        dispatch(toggleLoading())

        if (result.code !== 200) {
          dispatch(openSnackbar({ text: result.message, severity: "error" }))

          setTimeout(() => navigate("/login"), 2000)
        } else {
          dispatch(addUserData(result.data))

          dispatch(openSnackbar({ text: result.message }))
        }
      }

      handleGetUserData()
    }
  }, [session, user, dispatch, navigate])

  return (
    <Box sx={{ p: 3 }} component="main">
      <Typography>Lista de tarefas</Typography>
    </Box>
  )
}
