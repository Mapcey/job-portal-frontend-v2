import axios from "axios";
import { auth } from "../firebase/config";

const normalizeApiHost = (url?: string) => {
  if (!url) return undefined;
  return url.replace(/\/api2?\/?$/, "");
};

const getApiBaseUrl = () => {
  return (
    normalizeApiHost(import.meta.env.VITE_API_BASE_URL) ||
    normalizeApiHost(import.meta.env.VITE_API_URL) ||
    "http://46.62.192.148"
  );
};

const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
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

// --- Response Interceptor with Retry Logic ---
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Only retry on 500 and if retry count is less than 2
    if (error.response?.status === 500) {
      config._retryCount = config._retryCount || 0;

      if (config._retryCount < 2) {
        config._retryCount += 1;
        console.warn(`Retrying request... attempt ${config._retryCount + 1}`);
        return axiosInstance(config); // Retry the request
      }

      console.error("Max retry attempts reached for:", config.url);
    }

    return Promise.reject(error); // Final rejection
  }
);

export default axiosInstance;
