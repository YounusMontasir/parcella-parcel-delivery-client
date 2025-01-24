
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
import PrivateRoute from "./PrivateRoute";
import BookParcel from "@/Dashboard/DashboardPages/BookParcel";
import MyParcel from "@/Dashboard/DashboardPages/MyParcel";
import MyProfile from "@/Dashboard/DashboardPages/MyProfile";
import UpdateBookingParcel from "@/Dashboard/DashboardPages/UpdateBookingParcel";
import AllParcels from "@/Dashboard/DashboardPages/AllParcels";
import AllDeliveryMan from "@/Dashboard/DashboardPages/AllDeliveryMan";
import Statistics from "@/Dashboard/DashboardPages/Statistics";
import AdminRoute from "./AdminRoute";
import DeliveryManRoute from "./DeliveryManRoute";
import MyDeliveryList from "@/Dashboard/DashboardPages/MyDeliveryList";
import MyReviews from "@/Dashboard/DashboardPages/MyReviews";
import Payment from "@/Dashboard/DashboardPages/Payment";
import Confetti from "@/Dashboard/DashboardPages/Confetti";

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
      element: <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>,
      children: [
        // user route
        {
          path: '/dashboard/bookaparcel',
          element: <BookParcel></BookParcel>
        },
        {
          path: '/dashboard/myparcels',
          element: <MyParcel></MyParcel>
        },
        {
          path: '/dashboard/myprofile',
          element: <MyProfile></MyProfile>
        },
        {
          path: '/dashboard/updatebooking/:id',
          element: <UpdateBookingParcel></UpdateBookingParcel>,
          loader: ({params})=> fetch(`https://parcella-parcel-delivery-server.vercel.app/parcels/update/${params.id}`)
        },
        // admin routes
        {
          path: '/dashboard/allusers',
          element: <AdminRoute>
            <AllUsers></AllUsers>
          </AdminRoute>
        },
        {
          path: '/dashboard/allparcels',
          element: <AdminRoute>
            <AllParcels></AllParcels>
          </AdminRoute>
        },
        {
          path: '/dashboard/alldeliveryman',
          element:<AdminRoute>
             <AllDeliveryMan></AllDeliveryMan>
          </AdminRoute>
        },
        {
          path: '/dashboard/statistics',
          element: <AdminRoute>
            <Statistics></Statistics>
          </AdminRoute>
        },
        // delivery route
        {
          path: '/dashboard/mydeliverylist',
          element: <DeliveryManRoute>
            <MyDeliveryList></MyDeliveryList>
          </DeliveryManRoute>
        },
        {
          path: '/dashboard/myreviews',
          element: <DeliveryManRoute>
            <MyReviews></MyReviews>
          </DeliveryManRoute>
        },
        {
          path: '/dashboard/payment/:id',
          element: <Payment></Payment>,
          loader: ({params})=> fetch(`https://parcella-parcel-delivery-server.vercel.app/parcels/payment/${params.id}`)
        },
        
      ]
    },
    {
      path: '/confetti',
      element: <Confetti></Confetti>,
      
    }
  ]);

export default router;