import { persistReducer } from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"

import themeReducer from "./slices/themesSlice"
import loadingReducer from "./slices/loadingSlice"

const rootReducer = combineReducers({
  theme: themeReducer,
  loading: loadingReducer
})

export const persistedReducer = persistReducer(
  {
    key: "toDo",
    storage
  },
  rootReducer
)
