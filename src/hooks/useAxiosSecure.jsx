// // // import { useEffect } from 'react';
// // import axios from 'axios';
// // import useAuth from './useAuth';

// // const useAxiosSecure = () => {
// //   const {  getToken } = useAuth(); // assuming useAuth has getToken method

// //   // Create axios instance
// //   const axiosSecure = axios.create({
// //     baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
// //   });

// //   // Request interceptor to add JWT token
// //   axiosSecure.interceptors.request.use(
// //     async (config) => {
// //       const token = await getToken(); // get JWT from auth
// //       if (token) {
// //         config.headers.Authorization = `Bearer ${token}`;
// //       }
// //       return config;
// //     },
// //     (error) => Promise.reject(error)
// //   );

// //   // Response interceptor (optional)
// //   axiosSecure.interceptors.response.use(
// //     (response) => response,
// //     (error) => {
// //       if (error.response && (error.response.status === 401 || error.response.status === 403)) {
// //         // You can logout user or redirect to login here
// //         console.error('Unauthorized or Forbidden - JWT expired or invalid');
// //       }
// //       return Promise.reject(error);
// //     }
// //   );

// //   return axiosSecure;
// // };

// // export default useAxiosSecure;
// import { useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router";
// import useAuth from "./useAuth";
// // import useAuth from "../Providers/AuthContext";

// const axiosSecure = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
//   withCredentials: true, // cookie / credentials allow
// });

// const useAxiosSecure = () => {
//   const { user, logOut, loading } = useAuth();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (!loading && user?.accessToken) {
//       // ✅ Request interceptor → attach JWT
//       const requestInterceptor = axiosSecure.interceptors.request.use(
//         (config) => {
//           config.headers.authorization = `Bearer ${user.accessToken}`;
//           return config;
//         },
//         (error) => Promise.reject(error)
//       );

//       // ✅ Response interceptor → handle 401 / 403
//       const responseInterceptor = axiosSecure.interceptors.response.use(
//         (response) => response,
//         async (error) => {
//           const status = error?.response?.status;

//           if (status === 401 || status === 403) {
//             await logOut();
//             navigate("/login");
//           }

//           return Promise.reject(error);
//         }
//       );

//       // ✅ Cleanup (VERY IMPORTANT)
//       return () => {
//         axiosSecure.interceptors.request.eject(requestInterceptor);
//         axiosSecure.interceptors.response.eject(responseInterceptor);
//       };
//     }
//   }, [user, loading, logOut, navigate]);

//   return axiosSecure;
// };

// export default useAxiosSecure;
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { token, logOut } = useAuth(); // ✅ useAuth থেকে direct token
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Request → auto token attach
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // ✅ Response → 401 / 403 handle
    const resInterceptor = axiosSecure.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (
          error.response?.status === 401 ||
          error.response?.status === 403
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );

    // ✅ cleanup
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [token, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
