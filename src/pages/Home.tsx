/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Typography } from "@mui/material"

// import { TaskForm } from "../components"
import {
  useAppDispatch,
  useAppSelector,
  toggleLoading,
  addUserData
} from "../redux"
import { fetchUserData } from "../services/api"
import { useSnackbar } from "../hooks"

export function Home() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const session = useAppSelector((state) => state.session)
  const { handleOpenSnackbar, handleRenderSnackbar } = useSnackbar()

  useEffect(() => {
    if (!session) {
      navigate("/login")
    } else {
      const handleGetUserData = async () => {
        dispatch(toggleLoading())

        const result = await fetchUserData(session.csrfToken, session.userId)

        dispatch(toggleLoading())

        if (result.code !== 200) {
          handleOpenSnackbar(result.message, "error")

          setTimeout(() => navigate("/login"), 2000)
        } else {
          dispatch(addUserData(result.data))

          handleOpenSnackbar(result.message)
        }
      }

      handleGetUserData()
    }
  }, [dispatch, navigate])

  return (
    <Box sx={{ p: 3 }}>
      <Typography>Lista de tarefas</Typography>

      {handleRenderSnackbar()}
    </Box>
  )
}
