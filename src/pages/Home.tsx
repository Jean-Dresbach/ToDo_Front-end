import { Box, Typography } from "@mui/material"
import { useEffect } from "react"

import { TaskForm } from "../components/TaskForm"
import { useAppSelector } from "../redux"
import { useNavigate } from "react-router-dom"

export function Home() {
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  useEffect(() => {
    if (!user) {
      navigate("/login")
    }
  }, [user, navigate])

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
        <TaskForm />
      </Box>

      <Typography>Lista de tarefas</Typography>
    </Box>
  )
}
