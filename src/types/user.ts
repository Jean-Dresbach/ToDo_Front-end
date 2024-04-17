export interface IUser {
  id: string
  name: string
  email: string
  password: string
}

export interface ISignUpUser {
  name: string
  email: string
  password: string
}

export interface IUpdateUser {
  name?: string
  email?: string
  password?: string
}

export interface ILoginUser {
  email: string
  password: string
}
