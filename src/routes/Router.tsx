import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { Nav } from "../components"
import { SignUp } from "../pages/SignUp"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />,
    children: [
      {
        path: "signup",
        element: <SignUp />
      }
    ]
  }
])

export function Router() {
  return <RouterProvider router={router} />
}
