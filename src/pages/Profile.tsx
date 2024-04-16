import { Box, Divider, Typography } from "@mui/material"

export function Profile() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 3 }}>
      <Typography variant="h5" component="h2" fontWeight={500}>
        Profile
      </Typography>
      <Divider />
    </Box>
  )
}
