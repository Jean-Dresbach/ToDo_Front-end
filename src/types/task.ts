export interface ITaskModal {
  isOpen: boolean
  dataInitialState: ITask
}

export interface ITask {
  id: string
  title: string
  description: string
}

export interface ICreateTask {
  title: string
  description: string
}
