import { createSlice } from "@reduxjs/toolkit"

import { IUser } from "../../types/user"

const initialState: null | IUser = null

const userSlice = createSlice({
  name: "user",
  initialState: initialState as null | IUser,
  reducers: {
    addUserData(_, action) {
      return action.payload
    },
    removeUserData() {
      return null
    }
  }
})

export const { addUserData, removeUserData } = userSlice.actions
export default userSlice.reducer
