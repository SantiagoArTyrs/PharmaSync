import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div> // Or a spinner component
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute
