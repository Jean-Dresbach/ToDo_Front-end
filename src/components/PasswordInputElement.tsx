import { ChangeEvent, MouseEvent, useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from "@mui/material"

interface PasswordInputElementProps {
  name: string
  color?: "primary" | "error" | "secondary" | "info" | "success" | "warning"
  value: string
  errorCase: boolean
  label: string
  handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function PasswordInputElement({
  name,
  value,
  errorCase,
  label,
  color,
  handleInputChange
}: PasswordInputElementProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
  }

  return (
    <FormControl
      sx={{ width: "100%" }}
      variant="outlined"
      color={errorCase ? "error" : color ? color : "primary"}
      required
    >
      <InputLabel htmlFor={`outlined-adornment-${name}`}>{label}</InputLabel>

      <OutlinedInput
        required
        id={`outlined-adornment-${name}`}
        type={showPassword ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              onClick={() => setShowPassword(!showPassword)}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
        label={label}
        name={name}
        value={value}
        onChange={handleInputChange}
      />
    </FormControl>
  )
}
