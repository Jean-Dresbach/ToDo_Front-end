import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"

import themeReducer from "./slices/themeSlice"
import loadingReducer from "./slices/loadingSlice"
import userReducer from "./slices/userSlice"
import sessionReducer from "./slices/sessionSlice"
import snackbarReducer from "./slices/snackbarSlice"
import taskModalReducer from "./slices/taskModal"
import tasksReducer from "./slices/tasksSlice"
import paginationReducer from "./slices/paginationSlice"

const rootReducer = combineReducers({
  theme: themeReducer,
  loading: loadingReducer,
  user: userReducer,
  session: sessionReducer,
  snackbar: snackbarReducer,
  tasks: tasksReducer,
  taskModal: taskModalReducer,
  pagination: paginationReducer
})

export const persistedReducer = persistReducer(
  {
    key: "ToDo",
    storage
  },
  rootReducer
)
