import { ChangeEvent, FormEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Grid, Typography } from "@mui/material"
import { blueGrey } from "@mui/material/colors"

import {
  useAppSelector,
  useAppDispatch,
  toggleLoading,
  openSnackbar,
  removeUserData
} from "../../redux"
import { updateUser } from "../../services/api"
import { ConfirmModal } from "../ConfirmModal"
import { PasswordInputElement } from "../PasswordInputElement"
import { useErrorAlert } from "../../hooks/useErrorAlert"

const initialState = {
  password: "",
  confirm: ""
}

export function SecurityForm() {
  const dispatch = useAppDispatch()
  const session = useAppSelector((state) => state.session)

  const navigate = useNavigate()

  const {
    handleShowErrorAlert,
    setErrorAlertoToIntialState,
    errorAlert,
    setErrorAlert
  } = useErrorAlert()

  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [securityFormData, setSecurityFormData] = useState(initialState)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setSecurityFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (securityFormData.password !== securityFormData.confirm) {
      return setErrorAlert({
        isOpen: true,
        field: "password",
        message: "As senhas não coincidem"
      })
    }

    setErrorAlertoToIntialState()

    setOpenConfirmModal(true)
  }

  const handleConfirmSubmit = async () => {
    dispatch(toggleLoading())

    const result = await updateUser(
      session?.csrfToken as string,
      session?.userId as string,
      { password: securityFormData.password }
    )

    dispatch(toggleLoading())

    if (result.code === 401) {
      dispatch(openSnackbar({ text: result.message, severity: "error" }))

      setTimeout(() => navigate("/"), 2000)
    } else if (result.code === 200) {
      dispatch(removeUserData())

      dispatch(openSnackbar({ text: result.message }))

      setTimeout(() => navigate("/"), 2000)
    }

    setOpenConfirmModal(false)
  }

  return (
    <>
      <Grid container component="form" onSubmit={handleSubmit}>
        <Grid
          item
          xs={12}
          sm={2.5}
          sx={{ display: "flex", alignItems: "center", mb: 3 }}
        >
          <Typography
            htmlFor="password-security-form"
            component="label"
            color={blueGrey[200]}
          >
            NOVA SENHA
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={9.5}
          sx={{ display: "flex", alignItems: "center", mb: 3 }}
        >
          <Box sx={{ width: "100%", maxWidth: "350px" }}>
            <PasswordInputElement
              color="warning"
              name="password"
              value={securityFormData.password}
              errorCase={errorAlert.field === "password"}
              handleInputChange={handleInputChange}
              label="Senha"
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={2.5}
          sx={{ display: "flex", alignItems: "center", mb: 3 }}
        >
          <Typography
            htmlFor="name-profile-form"
            component="label"
            color={blueGrey[200]}
            sx={{ mr: 2 }}
          >
            CONFIRME A SENHA
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={9.5}
          sx={{ display: "flex", alignItems: "center", mb: 3 }}
        >
          <Box sx={{ width: "100%", maxWidth: "350px" }}>
            <PasswordInputElement
              color="warning"
              name="confirm"
              value={securityFormData.confirm}
              errorCase={errorAlert.field === "password"}
              handleInputChange={handleInputChange}
              label="Confirme senha"
            />
          </Box>
        </Grid>

        {errorAlert.isOpen && (
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Box sx={{ width: "100%", maxWidth: "517px" }}>
              {handleShowErrorAlert()}
            </Box>
          </Grid>
        )}

        <Grid item xs={12}>
          <Button variant="contained" type="submit">
            Atualizar senha
          </Button>
        </Grid>
      </Grid>

      <ConfirmModal
        isOpen={openConfirmModal}
        setIsOpen={setOpenConfirmModal}
        onConfirm={handleConfirmSubmit}
      />
    </>
  )
}
