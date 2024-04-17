/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dispatch, SetStateAction } from "react"
import { Box, Button, Divider, Modal, Typography } from "@mui/material"

interface ConfirmModalProps {
  text: string
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  onConfirm: () => Promise<void>
}

const style = {
  position: "absolute" as const,
  inset: 0,
  width: "90%",
  height: "min-content",
  maxWidth: "400px",
  margin: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 3,
  animation: "bounce .3s",
  zIndex: 1
}

export function ConfirmModal({
  text,
  isOpen,
  setIsOpen,
  onConfirm
}: ConfirmModalProps) {
  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h5">{text}</Typography>
        <Divider sx={{ my: 3 }} />
        <Box sx={{ display: "flex", justifyContent: "end", gap: 2 }}>
          <Button variant="contained" color="error" onClick={onConfirm}>
            Confirmar
          </Button>
          <Button variant="outlined" color="error" onClick={handleClose}>
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
