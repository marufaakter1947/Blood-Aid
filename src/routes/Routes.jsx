// import { createBrowserRouter } from 'react-router';
// import MainLayout from '../layouts/MainLayout';
// import DashboardLayout from '../layouts/DashboardLayout';
// import PrivateRoute from './PrivateRoute';

// import Home from '../Pages/Home/Home';
// import About from '../Pages/About/About';
// import Services from '../Pages/Services/Services';
// import Events from '../Pages/Events/Events';
// import DonationRequests from '../Pages/DonationRequests/DonationRequests';
// import Funding from '../Pages/Funding/Funding';

// import Login from '../Pages/Login/Login';
// import Registration from '../Pages/Registration/Registration';
// import ErrorPage from '../Pages/ErrorPage';

// import Profile from '../Pages/Dashboard/Common/Profile';
// import Statistics from '../Pages/Dashboard/Common/Statistics';
// import MyDonationRequests from '../Pages/Dashboard/Donor/MyDonationRequests';
// import CreateDonationRequest from '../Pages/Dashboard/Donor/CreateDonationRequest';
// import AllUsers from '../Pages/Dashboard/Admin/AllUsers';
// import AllBloodDonationRequests from '../Pages/Dashboard/Admin/AllBloodDonationRequests';

// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <MainLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       { path: '/', element: <Home /> },
//       { path: '/about', element: <About /> },
//       { path: '/services', element: <Services /> },
//       { path: '/events', element: <Events /> },
//       { path: '/donation-requests', element: <DonationRequests /> },
//       { path: '/login', element: <Login /> },
//       { path: '/registration', element: <Registration /> },
//       {
//         path: '/funding',
//         element: (
//           <PrivateRoute>
//             <Funding />
//           </PrivateRoute>
//         ),
//       },
//     ],
//   },
//   {
//     path: '/dashboard',
//     element: (
//       <PrivateRoute>
//         <DashboardLayout />
//       </PrivateRoute>
//     ),
//     children: [
//       { index: true, element: <Statistics /> },
//       { path: 'profile', element: <Profile /> },

//       // Donor Pages
//       { path: 'my-donation-requests', element: <MyDonationRequests /> },
//       { path: 'create-donation-request', element: <CreateDonationRequest /> },

//       // Admin & Volunteer Pages
//       { path: 'all-users', element: <AllUsers /> }, // Admin only
//       { path: 'all-blood-donation-request', element: <AllBloodDonationRequests /> }, // Admin & Volunteer
//     ],
//   },
// ]);
import { createBrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute";

// Layouts
import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

// Pages - Main
import Home from "../Pages/Home/Home";
import About from "../Pages/About/About";
import Services from "../Pages/Services/Services";
import Events from "../Pages/Events/Events";
import DonationRequests from "../Pages/DonationRequests/DonationRequests";
import Funding from "../Pages/Funding/Funding";

// Auth
import Login from "../Pages/Login/Login";
import Registration from "../Pages/Registration/Registration";
import ErrorPage from "../Pages/ErrorPage";

// Dashboard Pages
import Profile from "../Pages/Dashboard/Common/Profile";
import Statistics from "../Pages/Dashboard/Common/Statistics";
import CreateDonationRequest from "../Pages/Dashboard/Donor/CreateDonationRequest";
import MyDonationRequests from "../Pages/Dashboard/Donor/MyDonationRequests";
import AllUsers from "../Pages/Dashboard/Admin/AllUsers";
import AllBloodDonationRequests from "../Pages/Dashboard/Admin/AllBloodDonationRequests";

export const router = createBrowserRouter([
  // Public Routes
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
      { path: "/login", element: <Login /> },
      { path: "/registration", element: <Registration /> },

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

  // Dashboard Routes (Private)
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Dashboard Home (Statistics)
      { index: true, element: <Statistics /> },

      // Profile
      { path: "profile", element: <Profile /> },

      // Donor Routes
      { path: "create-donation-request", element: <CreateDonationRequest /> },
      { path: "my-donation-requests", element: <MyDonationRequests /> },

      // Admin Routes
      { path: "all-users", element: <AllUsers /> },

      // Shared Routes (Admin + Volunteer)
      { path: "all-blood-donation-request", element: <AllBloodDonationRequests /> },
    ],
  },
]);
