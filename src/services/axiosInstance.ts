import axios from "axios";
import { auth } from "../firebase/config";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to attach token
axiosInstance.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete config.headers.Authorization; // Clear header if user not logged in
    }
    // Log the request details
    console.log("Request URL:", config.url);
    console.log("Request Method:", config.method);
    console.log("Request Headers:", config.headers);
    console.log("Payload:", config.data);
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
