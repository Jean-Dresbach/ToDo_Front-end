export type PerPage = 5 | 10 | 20 | 50

export interface IPagination {
  currentPage: number
  tasksPerPage: PerPage
}
