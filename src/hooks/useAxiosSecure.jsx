
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { token, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // auto token attach
    const reqInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    //Response 
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

    // cleanup
    return () => {
      axiosSecure.interceptors.request.eject(reqInterceptor);
      axiosSecure.interceptors.response.eject(resInterceptor);
    };
  }, [token, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
