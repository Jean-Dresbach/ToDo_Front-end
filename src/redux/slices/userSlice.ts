import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import { login } from "../../services/api"
import { IUser, ILoginUser } from "../../types/user"
import { toggleLoading } from "./loadingSlice"

const initialState = null

export const loginRequest = createAsyncThunk(
  "user/login",
  async (data: ILoginUser, config) => {
    config.dispatch(toggleLoading())

    const result = await login(data)

    config.dispatch(toggleLoading())

    return result
  }
)

const userSlice = createSlice({
  name: "user",
  initialState: initialState as IUser | null,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loginRequest.fulfilled, (_, action) => {
      if (action.payload.code === 200) {
        return action.payload.data.user
      }
    })
  }
})

export default userSlice.reducer
