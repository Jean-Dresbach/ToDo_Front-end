import { Box, Divider, Typography, useTheme } from "@mui/material"

import { ProfileForm, SecurityForm } from "../components"
import { DeleteAccount } from "../components/Profile/DeleteAccount"

export function Profile() {
  const theme = useTheme()

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        bgcolor: theme.palette.background.paper,
        gap: 3,
        p: 3
      }}
    >
      <Box
        component="section"
        sx={{
          border: `1px solid ${theme.palette.primary.main}`,
          borderRadius: 2,
          p: 3
        }}
      >
        <Typography variant="h5" component="h2" fontWeight={500}>
          Perfil
        </Typography>

        <Divider sx={{ my: 3 }} />

        <ProfileForm />
      </Box>

      <Box
        component="section"
        sx={{
          border: `1px solid ${theme.palette.warning.main}`,
          borderRadius: 2,
          p: 3
        }}
      >
        <Typography variant="h5" component="h2" fontWeight={500}>
          Segurança
        </Typography>

        <Divider sx={{ my: 3 }} />

        <SecurityForm />
      </Box>

      <Box
        component="section"
        sx={{
          border: `1px solid ${theme.palette.error.main}`,
          borderRadius: 2,
          p: 3
        }}
      >
        <Typography variant="h5" component="h2" fontWeight={500}>
          Conta
        </Typography>

        <Divider sx={{ my: 3 }} />

        <DeleteAccount />
      </Box>
    </Box>
  )
}
