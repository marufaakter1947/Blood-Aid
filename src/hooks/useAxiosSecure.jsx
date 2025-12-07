// import { useEffect } from 'react';
import axios from 'axios';
import useAuth from './useAuth';

const useAxiosSecure = () => {
  const {  getToken } = useAuth(); // assuming useAuth has getToken method

  // Create axios instance
  const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  });

  // Request interceptor to add JWT token
  axiosSecure.interceptors.request.use(
    async (config) => {
      const token = await getToken(); // get JWT from auth
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Response interceptor (optional)
  axiosSecure.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        // You can logout user or redirect to login here
        console.error('Unauthorized or Forbidden - JWT expired or invalid');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
