import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Typography, useTheme } from "@mui/material"

import { fetchTasks } from "../../services/api"
import { TaskItem } from "./TaskItem"
import {
  addTasks,
  openSnackbar,
  removeUserData,
  toggleLoading,
  useAppDispatch,
  useAppSelector
} from "../../redux"
import { SearchOffRounded } from "@mui/icons-material"

export function TaskList() {
  const dispatch = useAppDispatch()
  const session = useAppSelector((state) => state.session)
  const tasks = useAppSelector((state) => state.tasks)
  const pagination = useAppSelector((state) => state.pagination)
  const theme = useAppSelector((state) => state.theme)

  const navigate = useNavigate()

  const themeMui = useTheme()

  useEffect(() => {
    if (tasks.length === 0) {
      const handleFetchTasks = async () => {
        dispatch(toggleLoading())

        const result = await fetchTasks(
          session?.csrfToken as string,
          session?.userId as string
        )

        dispatch(toggleLoading())

        if (result.code !== 200) {
          dispatch(openSnackbar({ text: result.message, severity: "error" }))

          setTimeout(() => dispatch(removeUserData()), 2000)
        } else {
          dispatch(addTasks(result.data))

          dispatch(openSnackbar({ text: result.message }))
        }
      }

      handleFetchTasks()
    }
  }, [dispatch, navigate, session?.csrfToken, session?.userId, tasks.length])

  const initialPosition = pagination.tasksPerPage * (pagination.currentPage - 1)

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        bgcolor:
          theme === "light"
            ? themeMui.palette.grey[100]
            : themeMui.palette.grey[800],
        borderRadius: 3,
        p: 3,
        marginBottom: "60.5px"
      }}
    >
      {tasks.length === 0 ? (
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <SearchOffRounded color="disabled" fontSize="large" />
          <Typography sx={{ color: themeMui.palette.text.disabled }}>
            Nenhuma tarefa encontrada
          </Typography>
        </Box>
      ) : (
        tasks
          .slice(initialPosition, initialPosition + pagination.tasksPerPage)
          .map((t) => {
            return <TaskItem key={t.id} task={t} />
          })
      )}
    </Box>
  )
}
