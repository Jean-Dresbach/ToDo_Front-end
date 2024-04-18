import axios, { AxiosError } from "axios"

import { ISignUpUser, ILoginUser, IUpdateUser } from "../types/user"
import { ICreateTask } from "../types/task"

const api = axios.create({
  withCredentials: true,
  baseURL: "http://localhost:3333"
})

export async function signUp(data: ISignUpUser) {
  try {
    const response = await api.post("/users/create", data)

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.status,
        message: error.response?.data.message
      }
    }
  }
}

export async function updateUser(
  csrfToken: string,
  userId: string,
  data: IUpdateUser
) {
  try {
    const response = await api.put(`/users/${userId}/update`, data, {
      headers: {
        Authorization: csrfToken
      }
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.status,
        message: error.response?.data.message
      }
    }
  }
}

export async function fetchUserData(csrfToken: string, userId: string) {
  try {
    const response = await api.get(`/users/${userId}/findById`, {
      headers: {
        Authorization: csrfToken
      }
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.status,
        message: error.response?.data.message
      }
    }
  }
}

export async function deleteUserAccount(csrfToken: string, userId: string) {
  try {
    const response = await api.delete(`/users/${userId}/delete`, {
      headers: {
        Authorization: csrfToken
      }
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.status,
        message: error.response?.data.message
      }
    }
  }
}

export async function login(data: ILoginUser) {
  try {
    const response = await api.post("/login", data)

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.status,
        message: error.response?.data.message
      }
    }
  }
}

export async function logout(csrfToken: string, userId: string) {
  try {
    const response = await api.delete(`/logout/${userId}`, {
      headers: {
        Authorization: csrfToken
      }
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.status,
        message: error.response?.data.message
      }
    }
  }
}

export async function fetchTasks(csrfToken: string, userId: string) {
  try {
    const response = await api.get(`/tasks/${userId}/findMany`, {
      headers: {
        Authorization: csrfToken
      }
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.status,
        message: error.response?.data.message
      }
    }
  }
}

export async function createTask(
  csrfToken: string,
  userId: string,
  data: ICreateTask
) {
  try {
    const response = await api.post(`/tasks/${userId}/create`, data, {
      headers: {
        Authorization: csrfToken
      }
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.status,
        message: error.response?.data.message
      }
    }
  }
}

export async function deleteTask(
  csrfToken: string,
  userId: string,
  taskId: string
) {
  try {
    const response = await api.delete(`/tasks/${userId}/delete/${taskId}`, {
      headers: {
        Authorization: csrfToken
      }
    })

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        code: error.response?.status,
        message: error.response?.data.message
      }
    }
  }
}
