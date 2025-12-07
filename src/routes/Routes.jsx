import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "./PrivateRoute";

import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Services from "../Pages/Services/Services";
import Events from "../Pages/Events/Events";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import Funding from "../Pages/Funding/Funding";

import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import ErrorPage from "../Pages/ErrorPage";

import Profile from "../Pages/Dashboard/Common/Profile";
import Statistics from "../Pages/Dashboard/Common/Statistics";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/services", element: <Services /> },
      { path: "/events", element: <Events /> },
      { path: "/donation-requests", element: <DonationRequests /> },

      // Auth
      { path: "/login", element: <Login /> },
      { path: "/registration", element: <Registration /> },

      // Funding (protected)
      {
        path: "/funding",
        element: (
          <PrivateRoute>
            <Funding />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Statistics /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);
