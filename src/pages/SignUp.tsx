import { useState, FormEvent, ChangeEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useTheme
} from "@mui/material"

import { useAppDispatch, toggleLoading } from "../redux"
import { signUp } from "../services/api"
import { useSnackbar, useErrorAlert } from "../hooks"
import { PasswordInputElement } from "../components"

export function SignUp() {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirm: ""
  })

  const { handleRenderSnackbar, handleOpenSnackbar } = useSnackbar()
  const {
    handleShowErrorAlert,
    setErrorAlertoToIntialState,
    errorAlert,
    setErrorAlert
  } = useErrorAlert()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (formData.password !== formData.confirm) {
      return setErrorAlert({
        isOpen: true,
        field: "password",
        message: "As senhas não coincidem"
      })
    }

    setErrorAlertoToIntialState()

    dispatch(toggleLoading())

    const result = await signUp(formData)

    dispatch(toggleLoading())

    if (result.code !== 201) {
      return setErrorAlert({
        isOpen: true,
        field: result.field,
        message: result.message
      })
    }

    setErrorAlertoToIntialState()

    handleOpenSnackbar(result.message)

    setTimeout(() => navigate("/login"), 2000)
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
      }}
    >
      <Box
        component={"form"}
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: "500px"
        }}
      >
        <Box mb={2}>
          <Typography variant="h4" gutterBottom component={"h1"}>
            Cadastre-se
          </Typography>
          <Divider />
        </Box>

        <TextField
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />

        <TextField
          type="email"
          label="E-mail"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          color={errorAlert.field === "email" ? "error" : "primary"}
          required
        />

        <PasswordInputElement
          errorCase={errorAlert.field === "password"}
          handleInputChange={handleInputChange}
          label="Password"
          name="password"
          value={formData.password}
        />

        <PasswordInputElement
          errorCase={errorAlert.field === "password"}
          handleInputChange={handleInputChange}
          label="Confirme senha"
          name="confirm"
          value={formData.confirm}
        />

        {handleShowErrorAlert()}

        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: "100vw", fontWeight: "bold", mt: 2 }}
        >
          Criar conta
        </Button>

        <Typography>
          Já tem uma conta?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: theme.palette.primary.main
            }}
          >
            Clique aqui
          </Link>
        </Typography>
      </Box>

      {handleRenderSnackbar()}
    </Box>
  )
}
