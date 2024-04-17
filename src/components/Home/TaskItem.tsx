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
import { useAppSelector } from "../../redux"

interface TransactionItemProps {
  task: ITask
}

export function TaskItem({ task }: TransactionItemProps) {
  const theme = useAppSelector((state) => state.theme)
  const themeMui = useTheme()

  const [menuState, setMenuState] = useState(false)

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
          title="oi"
          //   open={menuState}
          //   title={
          //     <EditAndDelete
          //       handleMenuOpen={handleMenuOpen}
          //       transaction={transaction}
          //       openConfirmDelete={handleConfirmDeleteOpen}
          //     />
          //   }
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
    </Box>
  )
}
