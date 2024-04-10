import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"

import themeReducer from "./slices/themesSlice"

const rootReducer = combineReducers({
  theme: themeReducer
})

export const persistedReducer = persistReducer(
  {
    key: "toDo",
    storage
  },
  rootReducer
)
