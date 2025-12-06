import Home from '../Pages/Home/Home'
import ErrorPage from '../Pages/ErrorPage'
import Login from '../Pages/Login/Login'
import Registration from '../Pages/Registration/Registration'

import PrivateRoute from './PrivateRoute'
import DashboardLayout from '../layouts/DashboardLayout'

import Profile from '../Pages/Dashboard/Common/Profile'
import Statistics from '../Pages/Dashboard/Common/Statistics'
import MainLayout from '../layouts/MainLayout'

import { createBrowserRouter } from 'react-router'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    //   {
    //     path: '/plant/:id',
    //     element: <PlantDetails />,
    //   },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/registration', element: <Registration></Registration> },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <PrivateRoute>
            <Statistics />
          </PrivateRoute>
        ),
      },
    //   {
    //     path: 'add-plant',
    //     element: (
    //       <PrivateRoute>
    //         <AddPlant />
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: 'my-inventory',
    //     element: (
    //       <PrivateRoute>
    //         <MyInventory />
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: 'manage-users',
    //     element: (
    //       <PrivateRoute>
    //         <ManageUsers />
    //       </PrivateRoute>
    //     ),
    //   },
      {
        path: 'profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
    //   {
    //     path: 'my-orders',
    //     element: (
    //       <PrivateRoute>
    //         <MyOrders />
    //       </PrivateRoute>
    //     ),
    //   },
    //   {
    //     path: 'manage-orders',
    //     element: <ManageOrders />,
    //   },
    ],
  },
])
