import {
  DarkMode,
  LightMode,
  ManageAccountsRounded,
  PermIdentity,
  ExpandMoreRounded,
  DesktopWindowsRounded,
  HomeRounded
} from "@mui/icons-material"
import {
  Box,
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme
} from "@mui/material"
import { useState, MouseEvent } from "react"

import { setTheme, useAppDispatch, useAppSelector } from "../redux"
import { LogoutItem } from "./LogoutItem"
import { useLocation, useNavigate } from "react-router-dom"

export function NavMenu() {
  const theme = useAppSelector((state) => state.theme)
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  const navigate = useNavigate()
  const pathName = useLocation().pathname

  const media = useMediaQuery("(min-width:400px)")
  const themeMui = useTheme()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleSetTheme(theme: "light" | "dark") {
    dispatch(setTheme(theme))
  }

  return (
    <>
      <Button
        id="basic-button"
        color="inherit"
        variant="outlined"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          display: "flex",
          gap: 2
        }}
      >
        <PermIdentity fontSize="large" />

        {media && user?.name}

        <ExpandMoreRounded sx={{ ml: 2 }} />
      </Button>

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
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            p: 2,
            gap: 1
          }}
        >
          <Box sx={{ width: "100%", display: "flex", gap: 1.5 }}>
            <DesktopWindowsRounded />
            <Typography alignSelf="start">Mode</Typography>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              variant={theme === "light" ? "contained" : "text"}
              startIcon={<LightMode />}
              onClick={() => handleSetTheme("light")}
              sx={{ padding: theme !== "light" ? "6px 16px" : "" }}
            >
              Light
            </Button>

            <Button
              variant={theme === "dark" ? "contained" : "text"}
              startIcon={<DarkMode />}
              onClick={() => handleSetTheme("dark")}
              sx={{ padding: theme !== "dark" ? "6px 16px" : "" }}
            >
              Dark
            </Button>
          </Box>
        </Box>

        <Divider sx={{ mb: 1 }} />

        <MenuItem
          onClick={() => {
            handleClose()
            navigate("/")
          }}
          disabled={pathName === "/"}
          sx={{
            py: 2,
            background: pathName === "/" ? themeMui.palette.grey[400] : ""
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
            background:
              pathName === "/profile" ? themeMui.palette.grey[400] : ""
          }}
        >
          <ListItemIcon>
            <ManageAccountsRounded />
          </ListItemIcon>

          <ListItemText>Perfil</ListItemText>
        </MenuItem>

        <LogoutItem />
      </Menu>
    </>
  )
}
