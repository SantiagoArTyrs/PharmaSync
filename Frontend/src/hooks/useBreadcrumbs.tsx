import { useLocation, useNavigate } from "react-router-dom"
import { useMemo } from "react"

interface BreadcrumbItem {
  id: string
  label: string
  path: string
  isActive?: boolean
}

// Mapea rutas a etiquetas para breadcrumb (ajusta según tus rutas)
const routeLabels: Record<string, string> = {
  "/": "Home",
  "/chat": "Chat",
  "/summary": "Clinical Summary",
  "/profile": "Profile",
  "/data-structures-demo": "Demo",
  "/users": "Users",
  "/admin/users": "Manage Users",
  // Agrega las demás rutas que tengas
}

export function useBreadcrumbs() {
  const location = useLocation()
  const navigate = useNavigate()

  // Divide la ruta en segmentos y construye breadcrumb
  const breadcrumbs = useMemo<BreadcrumbItem[]>(() => {
    const paths = location.pathname.split("/").filter(Boolean)
    const items: BreadcrumbItem[] = []

    // Siempre incluye "Home" como primer elemento
    items.push({
      id: "home",
      label: "Home",
      path: "/",
      isActive: location.pathname === "/",
    })

    let accumulatedPath = ""

    paths.forEach((segment, idx) => {
      accumulatedPath += "/" + segment
      const label = routeLabels[accumulatedPath] || segment
      items.push({
        id: accumulatedPath,
        label,
        path: accumulatedPath,
        isActive: idx === paths.length - 1,
      })
    })

    return items
  }, [location.pathname])

  // Función para navegar al hacer click en breadcrumb
  const onNavigate = (item: BreadcrumbItem) => {
    if (!item.isActive) {
      navigate(item.path)
    }
  }

  return { breadcrumbs, onNavigate }
}
