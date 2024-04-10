import axios from "axios"

import { ISignUpUser } from "../types/user"

const api = axios.create({
  baseURL: "http://localhost:3333"
})

export async function signUp(data: ISignUpUser) {
  try {
    const response = await api.post("/login", data)

    return response.data.data
  } catch (error) {
    console.log(error)

    return null
  }
}
