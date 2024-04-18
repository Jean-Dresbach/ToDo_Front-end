import { Dispatch, SetStateAction } from "react"
import { Box, Button } from "@mui/material"
import { DeleteRounded, EditRounded } from "@mui/icons-material"
import { grey } from "@mui/material/colors"

import { useAppDispatch, openModal } from "../../redux"
import { ITask } from "../../types/task"

interface EditAndDeleteProps {
  task: ITask
  handleMenuOpen: () => void
  setMenuState: Dispatch<SetStateAction<boolean>>
  setOpenConfirmModal: Dispatch<SetStateAction<boolean>>
}

export function EditAndDelete({
  task,
  handleMenuOpen,
  setMenuState,
  setOpenConfirmModal
}: EditAndDeleteProps) {
  const dispatch = useAppDispatch()

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Button
          startIcon={<EditRounded color="success" />}
          color="inherit"
          sx={{
            px: 2,
            "&:hover": {
              background: grey[800]
            }
          }}
          onClick={() => {
            handleMenuOpen()
            dispatch(openModal(task))
          }}
        >
          Editar
        </Button>
        <Button
          startIcon={<DeleteRounded color="error" />}
          color="inherit"
          sx={{
            px: 2,
            "&:hover": {
              background: grey[800]
            }
          }}
          onClick={() => {
            setOpenConfirmModal(true)
            setMenuState(false)
          }}
        >
          Excluir
        </Button>
      </Box>
    </>
  )
}
