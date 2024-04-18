import { Provider as ReduxProvider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react"

import { Root } from "./Root"
import { persitedStore, store } from "./redux"

export function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persitedStore} />
      <Root />
    </ReduxProvider>
  )
}
