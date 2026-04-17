import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { PrivateRoutes, PublicRoutes } from "./RouteGuard";
import { useAuth } from "../context";
import SuspenseUi from "../components/SuspenseUi";
import { lazy, Suspense } from "react"

//lazy load and code split requires a different import
const AuthLayout = lazy(() => import("../layouts/AuthLayout"))
const MyTasks = lazy(() => import("../pages/my-tasks/MyTasks"))
const NewTask = lazy(() => import("../pages/new-task/NewTask"))
const EditTask = lazy(() => import("../pages/edit-task/EditTask"))

export default function AppRoutes() {
  const { user } = useAuth()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "my-tasks",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <PrivateRoutes user={user}>
                <MyTasks />
              </PrivateRoutes>
            </Suspense>
          )
        },
        {
          path: "new-task",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <PrivateRoutes user={user}>
                <NewTask />
              </PrivateRoutes>
            </Suspense>
          )
        },
        {
          path: "edit-task/:taskId",
          element: (
            <Suspense fallback={<SuspenseUi />}>
              <PrivateRoutes user={user}>
                <EditTask />
              </PrivateRoutes>
            </Suspense>
          )
        }
      ],
    },
    {
      element: (
        <Suspense fallback={<SuspenseUi />}>
          <PublicRoutes user={user}>
            <AuthLayout />
          </PublicRoutes>
        </Suspense>
      ),
      children: [
        {
          path: "login",
          element: <Login />
        },
        {
          path: "register",
          element: <Register />
        }
      ]
    }
  ]);
  return <RouterProvider router={router} />;
}
