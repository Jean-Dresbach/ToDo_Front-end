import { useState, MouseEvent } from "react"
import {
  Button,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery
} from "@mui/material"
import {
  DarkMode,
  LightMode,
  LogoutRounded,
  ManageAccountsRounded,
  PermIdentity
} from "@mui/icons-material"
import { Box } from "@mui/system"
import { Outlet, useLocation } from "react-router-dom"

import { useAppDispatch, useAppSelector, setTheme } from "../redux"

export function Nav() {
  const media = useMediaQuery("(min-width:400px)")
  const pathName = useLocation().pathname
  const theme = useAppSelector((state) => state.theme)
  const user = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

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
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        padding: "0 !important",
        boxShadow: 10
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          p: 3
        }}
        component={"nav"}
      >
        <Typography variant="h1" fontSize={30} fontWeight={400}>
          ToDo App
        </Typography>

        {pathName !== "/" && (
          <IconButton
            onClick={() => handleSetTheme(theme === "light" ? "dark" : "light")}
          >
            {theme === "light" ? (
              <LightMode sx={{ fill: "black" }} />
            ) : (
              <DarkMode />
            )}
          </IconButton>
        )}

        {pathName === "/" && (
          <Button
            id="basic-button"
            color="inherit"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <PermIdentity
              fontSize="large"
              sx={{ mr: 2, position: "relative" }}
            />
            {media && user?.name}
          </Button>
        )}
      </Box>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
          sx: { width: media ? "250px" : "100%" }
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
        <MenuItem onClick={handleClose} sx={{ py: 2 }}>
          <ListItemIcon>
            <ManageAccountsRounded />
          </ListItemIcon>
          <ListItemText>Perfil</ListItemText>
        </MenuItem>
        <MenuItem
          sx={{
            py: 2,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: 1
          }}
        >
          <Typography alignSelf="start">Mode</Typography>
          <Box>
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
        </MenuItem>
        <MenuItem onClick={handleClose} sx={{ py: 2 }}>
          <ListItemIcon>
            <LogoutRounded />
          </ListItemIcon>
          <ListItemText>Sair</ListItemText>
        </MenuItem>
      </Menu>
      <Divider />

      <Outlet />
    </Container>
  )
}
