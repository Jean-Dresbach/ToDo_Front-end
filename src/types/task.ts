type TaskStatus = "PENDENTE" | "EM_PROGRESSO" | "COMPLETA"

export interface ITaskModal {
  isOpen: boolean
  dataInitialState: ITask
}

export interface ITask {
  id: string
  title: string
  description: string
  status: TaskStatus
}

export interface ICreateTask {
  title: string
  description: string
  status: TaskStatus
}

export interface IUpdateTask {
  id: string
  title?: string
  description?: string
  status?: TaskStatus
}
