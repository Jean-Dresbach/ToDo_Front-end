import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, Grid, TextField, Typography } from "@mui/material"
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

export function ProfileForm() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const session = useAppSelector((state) => state.session)

  const navigate = useNavigate()

  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [profileFormData, setProfileFormData] = useState({
    name: user?.name,
    email: user?.email
  })

  useEffect(() => {
    const handleCheckProfileInputs = () => {
      if (
        profileFormData.email !== user?.email ||
        profileFormData.name !== user?.name
      ) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }

    handleCheckProfileInputs()
  }, [profileFormData.email, profileFormData.name, user?.email, user?.name])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setProfileFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setOpenConfirmModal(true)
  }

  const handleConfirmSubmit = async () => {
    dispatch(toggleLoading())

    const result = await updateUser(
      session?.csrfToken as string,
      session?.userId as string,
      profileFormData
    )

    dispatch(toggleLoading())

    if (result.code === 401) {
      dispatch(openSnackbar({ text: result.message, severity: "error" }))

      navigate("/login")
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
          sm={2}
          sx={{ display: "flex", alignItems: "center", mb: 3 }}
        >
          <Typography
            htmlFor="email-profile-form"
            component="label"
            color={blueGrey[200]}
          >
            E-MAIL
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          sx={{ display: "flex", alignItems: "center", mb: 3 }}
        >
          <TextField
            id="email-profile-form"
            name="email"
            value={profileFormData.email}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={2}
          sx={{ display: "flex", alignItems: "center", mb: 3 }}
        >
          <Typography
            htmlFor="name-profile-form"
            component="label"
            color={blueGrey[200]}
          >
            NOME
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          sx={{ display: "flex", alignItems: "center", mb: 3 }}
        >
          <TextField
            id="name-profile-form"
            name="name"
            value={profileFormData.name}
            onChange={handleInputChange}
            required
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" type="submit" disabled={disabled}>
            Salvar Mudanças
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
