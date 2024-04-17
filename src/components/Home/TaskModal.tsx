import {
  Box,
  Button,
  Container,
  Divider,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography
} from "@mui/material"

const style = {
  position: "absolute" as const,
  inset: 0,
  width: "100%",
  maxWidth: "1200px",
  margin: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  animation: "bounce .3s"
}

export function TransactionModal() {
  return (
    <Modal
      open={isOpen}
      onClose={handleCloseTrasactionModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component={"form"} onSubmit={handleSubmit}>
        <Typography gutterBottom id="modal-modal-title" variant="h4">
          {isUpdate ? "Atulizar Transação" : "Criar Transação"}
        </Typography>

        <Divider />

        <Container
          maxWidth="md"
          sx={{
            display: "flex",
            height: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "15px"
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            gap={3}
          >
            <Select
              color={data.type === "Entrada" ? "success" : "error"}
              name="type"
              value={data.type}
              defaultValue={data.type}
              sx={{
                fontSize: `${media ? "25px" : "15px"}`,
                color: `${data.type === "Entrada" ? lightGreen[500] : red[400]}`
              }}
              variant="outlined"
              onChange={handleChange}
            >
              <MenuItem key="Entrada" value="Entrada">
                Entrada
              </MenuItem>

              <MenuItem key="Saída" value="Saída">
                Saída
              </MenuItem>
            </Select>

            <TextField
              id="value"
              name="value"
              value={data.value}
              onChange={handleChange}
              placeholder="0"
              color="primary"
              variant="standard"
              inputProps={{
                style: {
                  maxWidth: "250px",
                  textAlign: "center",
                  fontSize: `${media ? "50px" : "30px"}`,
                  height: `${media ? "80px" : "50px"}`,
                  color: `${
                    data.value !== ""
                      ? data.type === "Entrada"
                        ? lightGreen[500]
                        : red[400]
                      : ""
                  }`,
                  padding: 0
                }
              }}
            />
          </Box>

          <Button
            variant="text"
            color="inherit"
            sx={{ my: 1, gap: 1 }}
            onClick={toggleTagModalOpen}
          >
            {data.tag.name === "" ? (
              <>
                <TagIcon
                  color={data.type === "Entrada" ? "success" : "error"}
                />
                selecione sua tag
              </>
            ) : (
              <>
                <Typography>{data.tag.emoji}</Typography>
                <Typography>{data.tag.name}</Typography>
              </>
            )}
          </Button>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Button variant="outlined" onClick={handleCloseTrasactionModal}>
              Cancel
            </Button>
            <Button variant="contained" type="submit" disabled={disabled}>
              {isUpdate ? "Atualizar" : "Criar"}
            </Button>
          </Box>
        </Container>
      </Box>
    </Modal>
  )
}
