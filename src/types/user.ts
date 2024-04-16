/* eslint-disable @typescript-eslint/no-explicit-any */
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

export interface ILoginUser {
  email: string
  password: string
}

export interface IFetchUserDataResponse {
  code: number
  message: string
  data?: any
}
