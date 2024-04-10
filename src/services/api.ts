import axios, { AxiosError } from "axios"

import { ISignUpUser } from "../types/user"

const api = axios.create({
  baseURL: "http://localhost:3333"
})

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
