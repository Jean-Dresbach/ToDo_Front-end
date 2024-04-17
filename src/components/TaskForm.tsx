import { ChangeEvent, FormEvent, useState } from "react"
import { Button, TextField, Typography } from "@mui/material"
import { Box } from "@mui/system"

import { createTasks } from "../services/api"
import { useAppSelector } from "../redux"
import { IUser } from "../types/user"

const formDataInitialState = {
  title: "",
  description: ""
}

export function TaskForm() {
  const user = useAppSelector((state) => state.user) as IUser
  const {
    errorAlert,
    handleShowErrorAlert,
    setErrorAlert,
    setErrorAlertoToIntialState
  } = useErrorAlert()
  const { handleRenderSnackbar, handleOpenSnackbar } = useSnackbar()

  const [formData, setFormData] = useState(formDataInitialState)

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.description.length > 255) {
      return setErrorAlert({
        isOpen: true,
        field: "description",
        message: "A descrição não pode ter mais do que 255 caracteres"
      })
    }

    setErrorAlertoToIntialState()

    const result = await createTasks(user.id, formData)

    setFormData(formDataInitialState)

    handleOpenSnackbars(result.message)
  }

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "500px",
        gap: 3
      }}
    >
      <Typography variant="h5">Criar tarefa</Typography>

      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        required
      />

      <TextField
        label="Descrição"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        color={errorAlert.field === "description" ? "error" : "primary"}
        multiline
        maxRows={10}
        required
      />

      {handleShowErrorAlert()}

      <Button type="submit" variant="contained">
        Criar
      </Button>

      {handleRenderSnackbar()}
    </Box>
  )
}
