import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import {
  Box,
  Button,
  Divider,
  Modal,
  TextField,
  Typography
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
import { createTask } from "../../services/api"

const style = {
  position: "absolute" as const,
  inset: 0,
  width: "100%",
  maxWidth: "900px",
  margin: "auto auto 0",
  bgcolor: "background.paper",
  p: 3,
  animation: "bounce .3s",
  height: "500px"
}

export function TaskModal() {
  const dispatch = useAppDispatch()
  const session = useAppSelector((state) => state.session)
  const taskModal = useAppSelector((state) => state.taskModal)

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true)
  const [taskFormData, setTaskFormData] = useState(taskModal.dataInitialState)

  useEffect(() => {
    if (
      taskFormData.title.trim() !== "" &&
      taskFormData.description.trim() !== ""
    ) {
      setIsSubmitDisabled(false)
    } else {
      setIsSubmitDisabled(true)
    }
  }, [taskFormData.description, taskFormData.title])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "title" && value.length <= 100) {
      setTaskFormData((prevState) => ({ ...prevState, [name]: value }))
    } else if (name === "description" && value.length <= 255) {
      setTaskFormData((prevState) => ({ ...prevState, [name]: value }))
    }
  }

  const handleCloseModal = () => {
    dispatch(closeModal())
    setTaskFormData(taskModal.dataInitialState)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    dispatch(toggleLoading())

    const result = await createTask(
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
    } else if (result.code !== 201) {
      dispatch(openSnackbar({ text: result.message, severity: "error" }))
      setTimeout(() => {
        dispatch(removeUserData())
        handleCloseModal()
      }, 2000)
    } else {
      dispatch(openSnackbar({ text: result.message }))
      setTimeout(() => {
        dispatch(removeTasks())
        handleCloseModal()
      }, 2000)
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
          {taskModal.dataInitialState.id !== ""
            ? "Atulizar Tarefa"
            : "Criar Tarefa"}
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
