import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Typography, useMediaQuery, useTheme } from "@mui/material"

import {
  useAppDispatch,
  useAppSelector,
  toggleLoading,
  addUserData,
  openSnackbar,
  openModal
} from "../redux"
import { fetchUserData } from "../services/api"
import { AddTaskRounded } from "@mui/icons-material"
import { TaskModal } from "../components/Home/TaskModal"
import { Pagination } from "../components/Home/Pagination"

export function Home() {
  const dispatch = useAppDispatch()
  const session = useAppSelector((state) => state.session)
  const user = useAppSelector((state) => state.user)

  const navigate = useNavigate()

  const theme = useTheme()
  const media = useMediaQuery("(min-width:400px)")

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
    <Box
      sx={{
        p: 3,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        gap: 3
      }}
      component="main"
    >
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: "center", fontWeight: 500, mt: 1 }}
      >
        Lista de tarefas
      </Typography>

      <Pagination />

      <Box
        sx={{
          flexGrow: 1,
          border: `1px solid ${theme.palette.grey[700]}`,
          borderRadius: 3,
          height: "100%"
        }}
      ></Box>

      <Button
        variant="contained"
        startIcon={<AddTaskRounded />}
        sx={{ alignSelf: media ? "end" : "" }}
        onClick={() => dispatch(openModal())}
      >
        Nova tarefa
      </Button>

      <TaskModal />
    </Box>
  )
}
