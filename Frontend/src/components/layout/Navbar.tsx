"use client"

import type React from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogOut, User, MessageSquare, FileText, Settings } from "lucide-react"

export const Navbar: React.FC = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  const navItems = [
    { path: "/chat", label: "Chat", icon: MessageSquare, protected: true },
    { path: "/summary", label: "Clinical Summary", icon: FileText, protected: true },
    { path: "/profile", label: "Profile", icon: User, protected: true },
    ...(isAdmin()
      ? [{ path: "/admin/users", label: "Manage Users", icon: Settings, protected: true, adminOnly: true }]
      : []),
  ]

  return (
    <nav className="bg-white border-b border-border px-4 py-3 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-8">
          <Link to={isAuthenticated ? "/chat" : "/"} className="text-xl font-bold text-primary">
            PharmaSync
          </Link>

          {isAuthenticated && (
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                      isActive ? "bg-primary text-white" : "text-muted-foreground hover:text-primary"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                    {item.adminOnly && (
                      <Badge variant="secondary" className="text-xs">
                        Admin
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Welcome,</span>
                <span className="text-sm font-medium">{user?.firstName}</span>
                <Badge variant={user?.role === "ADMIN" ? "default" : "secondary"}>{user?.role}</Badge>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center space-x-2">
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </>
          ) : (
            <div className="flex items-center space-x-2">
              <Link to="/">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm">Register</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
