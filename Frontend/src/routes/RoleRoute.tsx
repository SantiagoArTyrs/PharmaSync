import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import type { Role } from "@/types"

interface RoleRouteProps {
  allowedRoles: Role[]
}

const RoleRoute = ({ allowedRoles }: RoleRouteProps) => {
  const { user, isAuthenticated, isLoading } = useAuthStore()

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  const hasRequiredRole = user?.roles?.some((role) => allowedRoles.includes(role))

  return hasRequiredRole ? <Outlet /> : <Navigate to="/" replace /> // Or a specific "Unauthorized" page
}

export default RoleRoute
