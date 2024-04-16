import { createSlice } from "@reduxjs/toolkit"

import { ISession } from "../../types/session"

const initialState: ISession | null = null

const sessionSlice = createSlice({
  name: "session",
  initialState: initialState as ISession | null,
  reducers: {
    addSession(_, action) {
      return action.payload
    },
    removeSession() {
      return null
    }
  }
})

export const { addSession, removeSession } = sessionSlice.actions
export default sessionSlice.reducer
