import axios, { AxiosError } from "axios"

import { ISignUpUser, ILoginUser } from "../types/user"

const api = axios.create({
  baseURL: "http://localhost:3333"
})

let csrfToken = ""

export async function signUp(data: ISignUpUser) {
  try {
    const response = await api.post("/users", data)

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data
    }
  }
}

export async function login(data: ILoginUser) {
  try {
    const response = await api.post("/login", data)

    csrfToken = response.data.data.session.csrfToken

    return response.data.data.user
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data
    }
  }
}
