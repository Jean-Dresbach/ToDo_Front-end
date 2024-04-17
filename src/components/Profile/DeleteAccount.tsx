import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Box, Button, Typography } from "@mui/material"

import { deleteUserAccount } from "../../services/api"
import { ConfirmModal } from "./ConfirmModal"
import {
  openSnackbar,
  removeSession,
  removeTasks,
  removeUserData,
  toggleLoading,
  useAppDispatch,
  useAppSelector
} from "../../redux"

export function DeleteAccount() {
  const dispatch = useAppDispatch()
  const session = useAppSelector((state) => state.session)

  const navigate = useNavigate()

  const [openConfirmModal, setOpenConfirmModal] = useState(false)

  const handleConfirmDelete = async () => {
    dispatch(toggleLoading())

    const result = await deleteUserAccount(
      session?.csrfToken as string,
      session?.userId as string
    )

    dispatch(toggleLoading())

    if (result.code !== 200) {
      dispatch(openSnackbar({ text: result.message, severity: "error" }))

      setTimeout(() => navigate("/login"), 2000)
    } else if (result.code === 200) {
      dispatch(openSnackbar({ text: result.message }))

      setTimeout(() => {
        dispatch(removeUserData())
        dispatch(removeTasks())
        dispatch(removeSession())
        navigate("/login")
      }, 2000)
    }

    setOpenConfirmModal(false)
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 3
        }}
      >
        <Typography textAlign={"justify"}>
          Depois de excluir sua conta, não há como voltar atrás. Por favor,
          tenha certeza.
        </Typography>
        <Button
          variant="contained"
          color="error"
          onClick={() => setOpenConfirmModal(true)}
          sx={{ minWidth: "max-content" }}
        >
          Excluir conta
        </Button>
      </Box>

      <ConfirmModal
        text="Tem certeza que deseja excluir sua conta?"
        isOpen={openConfirmModal}
        setIsOpen={setOpenConfirmModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
