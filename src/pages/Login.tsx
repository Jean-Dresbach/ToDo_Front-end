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

import {
  toggleLoading,
  useAppDispatch,
  addSession,
  openSnackbar
} from "../redux"
import { login } from "../services/api"
import { useErrorAlert } from "../hooks/useErrorAlert"
import { PasswordInputElement } from "../components"

export function Login() {
  const theme = useTheme()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    handleShowErrorAlert,
    setErrorAlertoToIntialState,
    errorAlert,
    setErrorAlert
  } = useErrorAlert()

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setFormData((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setErrorAlertoToIntialState()

    dispatch(toggleLoading())

    const result = await login(formData)

    dispatch(toggleLoading())

    if (result.code !== 200) {
      return setErrorAlert({
        isOpen: true,
        field: result.field,
        message: result.message
      })
    }

    dispatch(addSession(result.data))

    dispatch(openSnackbar({ text: result.message }))

    setTimeout(() => navigate("/"), 2000)
  }

  return (
    <Box
      component="main"
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
            Login
          </Typography>
          <Divider />
        </Box>

        <TextField
          type="email"
          label="E-mail"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          color={errorAlert.field === "all" ? "error" : "primary"}
          required
        />

        <PasswordInputElement
          errorCase={errorAlert.field === "all"}
          handleInputChange={handleInputChange}
          label="Password"
          name="password"
          value={formData.password}
        />

        {handleShowErrorAlert()}

        <Button
          type="submit"
          variant="contained"
          sx={{ borderRadius: "100vw", fontWeight: "bold", mt: 2 }}
        >
          Entrar na conta
        </Button>

        <Typography>
          Nãp tem uma conta?{" "}
          <Link
            to="/signup"
            style={{
              textDecoration: "none",
              color: theme.palette.primary.main
            }}
          >
            Clique aqui
          </Link>
        </Typography>
      </Box>
    </Box>
  )
}
