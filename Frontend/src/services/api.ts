import axios from "axios"
import { useAuthStore } from "@/stores/authStore" // Import Zustand store

const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api"

const api = axios.create({
  baseURL: VITE_API_BASE_URL,
})

api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token // Get token from Zustand store
     console.log("Sending token:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
        console.log("Request headers:", config.headers)  // <-- Aquí
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      useAuthStore.getState().logout() // Clear auth state
      // Potentially redirect: window.location.href = '/login';
      console.error("Unauthorized access - logging out.")
    }
    return Promise.reject(error)
  },
)

export default api
