import { Box, Divider, Typography, useTheme } from "@mui/material"

import { ProfileForm } from "../components/ProfileForm"

export function Profile() {
  const theme = useTheme()

  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
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
    </Box>
  )
}
