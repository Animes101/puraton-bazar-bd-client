import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

const axiosSecure = axios.create({
  baseURL: "https://puratonbazarserver.vercel.app",
});

const useAxiosSecure = () => {

  const {logout}=useContext(AuthContext);
  // Request interceptor
  axiosSecure.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("ac-token");
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosSecure.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if(error.response && (error.response.status === 401 || error.response.status === 403)){
        //handle unauthorized access
        // e.g., logout user, redirect to login page, etc.
        console.log("Unauthorized access - logging out user. some Issu Width Token");

        logout();

        


      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
