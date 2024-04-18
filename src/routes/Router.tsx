import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { Header } from "../components"
import { SignUp, Home, Login, Profile } from "../pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/profile",
        element: <Profile />
      }
    ]
  }
])

export function Router() {
  return <RouterProvider router={router} />
}
