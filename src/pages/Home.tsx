import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Typography } from "@mui/material"

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
import { Pagination, TaskList, TaskModal } from "../components"

export function Home() {
  const dispatch = useAppDispatch()
  const session = useAppSelector((state) => state.session)
  const user = useAppSelector((state) => state.user)

  const navigate = useNavigate()

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
    <>
      <Typography
        variant="h4"
        component="h2"
        sx={{ textAlign: "center", fontWeight: 500, mt: 1, mb: 3 }}
      >
        Lista de tarefas
      </Typography>

      <Pagination />

      <TaskList />

      <Button
        variant="contained"
        startIcon={<AddTaskRounded />}
        sx={{
          position: "absolute",
          width: "max-content",
          zIndex: 999,
          bottom: "24px",
          right: "24px",
          left: "24px",
          margin: "0 auto"
        }}
        onClick={() => dispatch(openModal())}
      >
        Nova tarefa
      </Button>

      <TaskModal />
    </>
  )
}
