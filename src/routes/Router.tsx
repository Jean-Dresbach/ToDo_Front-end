import { RouterProvider, createBrowserRouter } from "react-router-dom"

import { Nav } from "../components/Nav"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Nav />
  }
])

export function Router() {
  return <RouterProvider router={router} />
}
