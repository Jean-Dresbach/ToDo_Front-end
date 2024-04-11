import axios, { AxiosError } from "axios"

import { ISignUpUser, ILoginUser } from "../types/user"
import { ICreateTask } from "../types/task"

const api = axios.create({
  withCredentials: true,
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
    console.log(csrfToken)

    csrfToken = response.data.data.session.csrfToken

    console.log(csrfToken)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data
    }
  }
}

export async function fetchTasks(userId: string) {
  try {
    const response = await api.get(`/tasks/${userId}`, {
      headers: {
        Authorization: csrfToken
      }
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data
    }
  }
}

export async function createTasks(userId: string, data: ICreateTask) {
  try {
    const response = await api.post(`/tasks/${userId}`, data, {
      headers: {
        Authorization: csrfToken
      }
    })

    console.log(csrfToken)

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return error.response?.data
    }
  }
}
