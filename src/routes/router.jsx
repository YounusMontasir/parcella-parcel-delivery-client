
import {
    createBrowserRouter,
  } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import AuthLayout from "@/layout/AuthLayout";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/Dashboard/DashboardPages/Dashboard";
import AllUsers from "@/Dashboard/DashboardPages/AllUsers";

const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout></MainLayout>,
      children: [
        {
            path: "/",
            element: <Home></Home>,
        }
      ]
    },
    {
        path: "/auth",
        element:<AuthLayout></AuthLayout>,
        children: [
            {
                path: '/auth/login',
                element: <Login></Login>
            },
            {
                path: '/auth/register',
                element: <Register></Register>
            }
        ]
    },
    {
      path: '/dashboard',
      element: <Dashboard></Dashboard>,
      children: [
        {
          path: '/dashboard/allusers',
          element: <AllUsers></AllUsers>
        }
      ]
    }
  ]);

export default router;