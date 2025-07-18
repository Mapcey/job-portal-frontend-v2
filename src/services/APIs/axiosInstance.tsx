import axios from "axios";
import { auth } from "../../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to attach Firebase token
axiosInstance.interceptors.request.use(
  async (config) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
      }
    });
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
