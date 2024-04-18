import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import {
  Box,
  Button,
  Divider,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme
} from "@mui/material"

import {
  useAppSelector,
  closeModal,
  useAppDispatch,
  openSnackbar,
  toggleLoading,
  removeUserData,
  removeSession,
  removeTasks
} from "../../redux"
import { createTask, updateTask } from "../../services/api"

const style = {
  position: "absolute" as const,
  inset: 0,
  width: "100%",
  maxWidth: "900px",
  margin: "auto auto 0",
  bgcolor: "background.paper",
  p: 3,
  animation: "bounce .3s",
  height: "560px"
}

export function TaskModal() {
  const dispatch = useAppDispatch()
  const session = useAppSelector((state) => state.session)
  const taskModal = useAppSelector((state) => state.taskModal)
  const tasks = useAppSelector((state) => state.tasks)

  const theme = useTheme()

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [taskFormData, setTaskFormData] = useState(taskModal.dataInitialState)

  const isCreate = taskModal.dataInitialState.id === ""

  useEffect(() => {
    setTaskFormData(taskModal.dataInitialState)
  }, [taskModal.dataInitialState])

  useEffect(() => {
    if (isCreate) {
      if (
        taskFormData.title.trim() !== "" &&
        taskFormData.description.trim() !== ""
      ) {
        setIsSubmitDisabled(false)
      } else {
        setIsSubmitDisabled(true)
      }
    } else {
      if (
        taskFormData.title !== taskModal.dataInitialState.title ||
        taskFormData.description !== taskModal.dataInitialState.description ||
        taskFormData.status !== taskModal.dataInitialState.status
      ) {
        setIsSubmitDisabled(false)
      } else {
        setIsSubmitDisabled(true)
      }
    }
  }, [
    isCreate,
    taskFormData.description,
    taskFormData.status,
    taskFormData.title,
    taskModal.dataInitialState.description,
    taskModal.dataInitialState.status,
    taskModal.dataInitialState.title
  ])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "title" && value.length <= 100) {
      setTaskFormData((prevState) => ({ ...prevState, [name]: value }))
    } else if (name === "description" && value.length <= 255) {
      setTaskFormData((prevState) => ({ ...prevState, [name]: value }))
    } else {
      setTaskFormData((prevState) => ({ ...prevState, [name]: value }))
    }
  }

  const handleSelectChange = (
    e: SelectChangeEvent<"PENDENTE" | "EM_PROGRESSO" | "COMPLETA">
  ) => {
    const value = e.target.value

    setTaskFormData((prevState) => ({
      ...prevState,
      status: value as typeof taskFormData.status
    }))
  }

  const handleCloseModal = () => {
    dispatch(closeModal())
    setTaskFormData(taskModal.dataInitialState)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(toggleLoading())

    const result =
      taskModal.dataInitialState.id === ""
        ? await createTask(
            session?.csrfToken as string,
            session?.userId as string,
            taskFormData
          )
        : await updateTask(
            session?.csrfToken as string,
            session?.userId as string,
            taskFormData
          )

    dispatch(toggleLoading())

    if (result.code === 401) {
      dispatch(openSnackbar({ text: result.message, severity: "error" }))
      setTimeout(() => {
        dispatch(removeUserData())
        dispatch(removeSession())
        handleCloseModal()
      }, 2000)
    } else if (result.code !== 201 && result.code !== 200) {
      dispatch(openSnackbar({ text: result.message, severity: "error" }))
      setTimeout(() => {
        dispatch(removeUserData())
        handleCloseModal()
      }, 2000)
    } else {
      dispatch(openSnackbar({ text: result.message }))
      setTimeout(() => {
        handleCloseModal()
        if (tasks.length === 0) {
          window.location.reload()
        } else {
          dispatch(removeTasks())
        }
      }, 2000)
    }
  }

  const handleTaskColor = () => {
    if (taskFormData.status === "PENDENTE") {
      return theme.palette.primary.main
    } else if (taskFormData.status === "EM_PROGRESSO") {
      return theme.palette.warning.main
    } else {
      return theme.palette.success.main
    }
  }

  return (
    <Modal
      open={taskModal.isOpen}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h4">
          {isCreate ? "Criar Tarefa" : "Atulizar Tarefa"}
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Box
          component={"form"}
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "362px",
            maxWidth: "350px",
            margin: "auto",
            gap: 3
          }}
        >
          <TextField
            label="Título"
            variant="outlined"
            name="title"
            value={taskFormData.title}
            onChange={handleInputChange}
            sx={{ width: "100%", maxWidth: "350px" }}
          />

          <TextField
            label="Descrição"
            variant="outlined"
            name="description"
            value={taskFormData.description}
            onChange={handleInputChange}
            sx={{ width: "100%", maxWidth: "350px" }}
          />

          <Select
            color={
              taskFormData.status === "PENDENTE"
                ? "primary"
                : taskFormData.status === "EM_PROGRESSO"
                ? "warning"
                : "success"
            }
            name="type"
            value={taskFormData.status}
            sx={{
              color: handleTaskColor()
            }}
            variant="outlined"
            onChange={handleSelectChange}
          >
            <MenuItem key="PENDENTE" value="PENDENTE">
              PENDENTE
            </MenuItem>

            <MenuItem key="EM_PROGRESSO" value="EM_PROGRESSO">
              EM PROGRESSO
            </MenuItem>

            <MenuItem key="COMPLETA" value="COMPLETA">
              COMPLETA
            </MenuItem>
          </Select>

          <Box
            sx={{ display: "flex", gap: 2, width: "100%", maxWidth: "350px" }}
          >
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitDisabled}
            >
              Confirmar
            </Button>
            <Button variant="outlined" color="error" onClick={handleCloseModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}
