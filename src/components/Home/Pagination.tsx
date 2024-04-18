import {
  Box,
  FormControl,
  FormHelperText,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent
} from "@mui/material"
import { ArrowBackRounded, ArrowForwardRounded } from "@mui/icons-material"

import {
  useAppSelector,
  changePerPage,
  useAppDispatch,
  changePage
} from "../../redux"
import { PerPage } from "../../types/pagination"

export function Pagination() {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector((state) => state.tasks)
  const { currentPage, tasksPerPage } = useAppSelector(
    (state) => state.pagination
  )

  const totalOfPages =
    tasks.length !== 0 ? Math.ceil(tasks.length / tasksPerPage) : 1

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target
    let newValue = Number(value)

    if (name === "currentPage") {
      newValue = Math.max(
        1,
        Math.min(newValue, Math.ceil(tasks.length / tasksPerPage))
      )
      dispatch(changePage(newValue))
    } else {
      dispatch(changePerPage(Number(value) as PerPage))
    }
  }

  const handlePrevOrNextClick = (name: "prev" | "next") => {
    name === "prev"
      ? dispatch(changePage(currentPage - 1))
      : dispatch(changePage(currentPage + 1))
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 2
      }}
    >
      <Box sx={{ display: "flex", gap: 1 }}>
        <FormControl>
          <Select
            sx={{ padding: 1, maxHeight: "150px" }}
            name="currentPage"
            value={currentPage.toString()}
            onChange={handleSelectChange}
            MenuProps={{ PaperProps: { sx: { ...{ maxHeight: 150 } } } }}
            className="pagination"
          >
            {Array.from({ length: totalOfPages }, (_, index) => (
              <MenuItem key={index + 1} value={index + 1}>
                {index + 1}
              </MenuItem>
            ))}
          </Select>

          <FormHelperText
            sx={{ textAlign: "center", fontSize: "10px", m: 0, mt: 1 }}
          >
            Escolha a página
          </FormHelperText>
        </FormControl>

        <FormControl>
          <Select
            sx={{ padding: 1 }}
            name="perPage"
            className="pagination"
            value={tasksPerPage.toString()}
            onChange={handleSelectChange}
          >
            <MenuItem value="5">5</MenuItem>
            <MenuItem value="10">10</MenuItem>
            <MenuItem value="20">20</MenuItem>
            <MenuItem value="50">50</MenuItem>
          </Select>

          <FormHelperText
            sx={{ textAlign: "center", fontSize: "10px", m: 0, mt: 1 }}
          >
            Tarefas por página
          </FormHelperText>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: "80px" }}>
        <IconButton
          disabled={currentPage === 1}
          onClick={() => handlePrevOrNextClick("prev")}
        >
          <ArrowBackRounded />
        </IconButton>
        <IconButton
          disabled={
            currentPage ===
            (tasks.length !== 0 ? Math.ceil(tasks.length / tasksPerPage) : 1)
          }
          onClick={() => handlePrevOrNextClick("next")}
        >
          <ArrowForwardRounded />
        </IconButton>
      </Box>
    </Box>
  )
}
