import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { Nav } from "../components"
import { SignUp } from "../pages/SignUp"
import { Login } from "../pages/Login"
import { Home } from "../pages/Home"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
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
      }
    ]
  }
])

export function Router() {
  return <RouterProvider router={router} />
}
