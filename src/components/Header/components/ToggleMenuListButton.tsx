import { PermIdentity, ExpandMoreRounded } from "@mui/icons-material"
import { Button, useMediaQuery } from "@mui/material"
import { useState, MouseEvent } from "react"

import { useAppSelector } from "../../../redux"
import { MenuElement } from "./MenuElement"

export function ToggleMenuListButton() {
  const user = useAppSelector((state) => state.user)

  const media = useMediaQuery("(min-width:400px)")

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
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

      <MenuElement anchorEl={anchorEl} open={open} setAnchorEl={setAnchorEl} />
    </>
  )
}
