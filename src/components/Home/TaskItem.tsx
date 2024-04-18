import { useState } from "react"
import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  useTheme
} from "@mui/material"
import { MenuOpen, CloseRounded } from "@mui/icons-material"

// import { EditAndDelete } from "./EditAndDelete"
import { ITask } from "../../types/task"
import {
  openSnackbar,
  removeSession,
  removeTasks,
  removeUserData,
  toggleLoading,
  useAppDispatch,
  useAppSelector
} from "../../redux"
import { EditAndDelete } from "./EditAndDelete"
import { ConfirmModal } from "../ConfirmModal"
import { deleteTask } from "../../services/api"

interface TaskItemProps {
  task: ITask
}

export function TaskItem({ task }: TaskItemProps) {
  const dispatch = useAppDispatch()
  const session = useAppSelector((state) => state.session)
  const theme = useAppSelector((state) => state.theme)
  const themeMui = useTheme()

  const [menuState, setMenuState] = useState(false)
  const [openConfirmModal, setOpenConfirmModal] = useState(false)

  const handleMenuOpen = () => {
    setMenuState((prevState) => !prevState)
  }

  const handleTaskColor = () => {
    if (task.status === "PENDENTE") {
      return themeMui.palette.text.secondary
    } else if (task.status === "EM_PROGRESSO") {
      return themeMui.palette.warning.main
    } else {
      return themeMui.palette.success.main
    }
  }

  const handleDelete = async () => {
    dispatch(toggleLoading())

    const result = await deleteTask(
      session?.csrfToken as string,
      session?.userId as string,
      task.id
    )

    console.log(result)

    dispatch(toggleLoading())

    if (result.code === 401) {
      dispatch(openSnackbar({ text: result.message, severity: "error" }))
      setTimeout(() => {
        dispatch(removeUserData())
        dispatch(removeSession())
      }, 2000)
    } else if (result.code !== 200) {
      dispatch(openSnackbar({ text: result.message, severity: "error" }))
      setTimeout(() => {
        dispatch(removeUserData())
        dispatch(removeTasks())
      }, 2000)
    } else {
      dispatch(openSnackbar({ text: result.message }))
      setTimeout(() => {
        dispatch(removeTasks())
      }, 2000)
    }
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        position: "relative",
        border: `1px solid ${handleTaskColor()}`
      }}
      key={task.id}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          pt: 1.5,
          px: 2,
          gap: 0.5
        }}
      >
        <Typography sx={{ flexGrow: 1, fontWeight: 600, py: 1 }}>
          {task.title}
        </Typography>

        <Divider orientation="vertical" flexItem />

        <Tooltip
          open={menuState}
          title={
            <EditAndDelete
              setOpenConfirmModal={setOpenConfirmModal}
              handleMenuOpen={handleMenuOpen}
              task={task}
              setMenuState={setMenuState}
            />
          }
          placement="left"
          arrow
          sx={{ zIndex: 99 }}
        >
          <IconButton onClick={handleMenuOpen}>
            {menuState ? <CloseRounded /> : <MenuOpen />}
          </IconButton>
        </Tooltip>
      </Box>

      <Divider />

      <Typography sx={{ p: 2, color: themeMui.palette.text.secondary }}>
        {task.description}
      </Typography>

      <Box
        sx={{
          border: `1px solid ${handleTaskColor()}`,
          bgcolor:
            theme === "light"
              ? themeMui.palette.grey[100]
              : themeMui.palette.grey[800],
          borderRadius: "100vw",
          px: 3,
          width: "max-content",
          position: "absolute",
          top: "-13px",
          left: "24px",
          color: handleTaskColor()
        }}
      >
        {task.status === "EM_PROGRESSO"
          ? task.status.replace("_", " ")
          : task.status}
      </Box>

      <ConfirmModal
        isOpen={openConfirmModal}
        onConfirm={handleDelete}
        setIsOpen={setOpenConfirmModal}
        text="Tem certeza que deseja excluir sua tarefa?"
      />
    </Box>
  )
}
