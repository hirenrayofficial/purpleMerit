import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signin from "./pages/auth/Signin";
import HomeLayout from "./component/Layout/HomeLayout";
import DashboardLayout from "./component/Layout/DashboardLayout";
import DashboardProtectedroute from "./protectedComponents/DashboardProtectedroute";
import Users from "./dashboard/pages/Users";
import Create from "./dashboard/pages/CreateUser";
import { AuthProvider } from "./context/AuthProvider";
import Dashboard from "./dashboard/Dashboard";
import Pendinguser from "./dashboard/pages/Pendinguser";
import Profile from "./dashboard/pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      { index: true, element: <Login /> },
      { path: "/login", element: <Login /> },
      { path: "/signin", element: <Signin /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AuthProvider>
        <DashboardProtectedroute>
          <DashboardLayout />
        </DashboardProtectedroute>
      </AuthProvider>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "/dashboard/create", element: <Create /> },
      { path: "/dashboard/users", element: <Users /> },
      { path: "/dashboard/pending", element: <Pendinguser /> },
            { path: "/dashboard/profile", element: <Profile /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
