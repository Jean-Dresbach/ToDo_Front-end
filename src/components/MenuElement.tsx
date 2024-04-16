import { SetStateAction } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import {
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from "@mui/material"
import { ToggleThemeNavMenuButtom } from "./ToggleThemeNavMenuButtom"
import { HomeRounded, ManageAccountsRounded } from "@mui/icons-material"

import { LogoutButton } from "./LogoutButton"

interface MenuElProps {
  open: boolean
  anchorEl: HTMLElement | null
  setAnchorEl: (value: SetStateAction<HTMLElement | null>) => void
}

export function MenuElement({ anchorEl, open, setAnchorEl }: MenuElProps) {
  const navigate = useNavigate()
  const pathName = useLocation().pathname

  const theme = useTheme()
  const media = useMediaQuery("(min-width:400px)")

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        "aria-labelledby": "basic-button",
        sx: { width: media ? "350px" : "100vw" }
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right"
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right"
      }}
    >
      <ToggleThemeNavMenuButtom />

      <Divider sx={{ mb: 1 }} />

      <MenuItem
        onClick={() => {
          handleClose()
          navigate("/")
        }}
        disabled={pathName === "/"}
        sx={{
          py: 2,
          background: pathName === "/" ? theme.palette.grey[400] : ""
        }}
      >
        <ListItemIcon>
          <HomeRounded />
        </ListItemIcon>

        <ListItemText>Home</ListItemText>
      </MenuItem>

      <MenuItem
        onClick={() => {
          handleClose()
          navigate("/profile")
        }}
        disabled={pathName === "/profile"}
        sx={{
          py: 2,
          background: pathName === "/profile" ? theme.palette.grey[400] : ""
        }}
      >
        <ListItemIcon>
          <ManageAccountsRounded />
        </ListItemIcon>

        <ListItemText>Perfil</ListItemText>
      </MenuItem>

      <LogoutButton />
    </Menu>
  )
}
