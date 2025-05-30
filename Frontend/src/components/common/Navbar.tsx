"use client"

import type React from "react"

import { Link, NavLink, useNavigate } from "react-router-dom"
import { useAuthStore } from "@/stores/authStore"
import { LogOut, UserCircle, Users, MessageSquareText, FileText } from "lucide-react" // Updated Icon
import { Button } from "@/components/ui/button" // Assuming you have a Button component like shadcn/ui

const PharmaSyncLogo = () => (
  <svg width="32" height="32" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="48" fill="#E0E7FF" />
    <path
      d="M50 15C69.33 15 85 30.67 85 50C85 69.33 69.33 85 50 85C30.67 85 15 69.33 15 50C15 30.67 30.67 15 50 15ZM50 25C36.193 25 25 36.193 25 50C25 63.807 36.193 75 50 75C63.807 75 75 63.807 75 50C75 36.193 63.807 25 50 25Z"
      fill="#4F46E5"
    />
    <path
      d="M50 35C58.284 35 65 41.716 65 50C65 58.284 58.284 65 50 65C41.716 65 35 58.284 35 50C35 41.716 41.716 35 50 35Z"
      fill="#A5B4FC"
    />
    <path d="M50 40L50 60M40 50L60 50" stroke="#4F46E5" strokeWidth="5" strokeLinecap="round" />
  </svg>
)

const NavItem = ({ to, icon: Icon, children }: { to: string; icon: React.ElementType; children: React.ReactNode }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive ? "bg-indigo-700 text-white" : "text-indigo-100 hover:bg-indigo-500 hover:bg-opacity-75"
        }`
      }
    >
      <Icon className="mr-2 h-5 w-5" />
      {children}
    </NavLink>
  )
}

const Navbar = () => {
  const { isAuthenticated, isAdmin, logout, user } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <nav className="bg-indigo-600 fixed w-full top-0 left-0 z-50 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center text-white">
              <PharmaSyncLogo />
              <span className="ml-3 text-xl font-bold">PharmaSync</span>
            </Link>
            {isAuthenticated && (
              <div className="hidden md:flex md:ml-10 md:space-x-4">
                <NavItem to="/chat" icon={MessageSquareText}>
                  Chat
                </NavItem>
                <NavItem to="/clinical-summary" icon={FileText}>
                  Clinical Summary
                </NavItem>
                <NavItem to="/profile" icon={UserCircle}>
                  Profile
                </NavItem>
                {isAdmin && (
                  <NavItem to="/admin/users" icon={Users}>
                    Manage Users{" "}
                    <span className="ml-1.5 px-1.5 py-0.5 text-xs font-semibold bg-indigo-500 text-indigo-100 rounded-full">
                      Admin
                    </span>
                  </NavItem>
                )}
                {/* <NavItem to="/featured-info" icon={ShieldQuestion}>Featured (DCLL)</NavItem> */}
              </div>
            )}
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <>
                <span className="text-indigo-100 text-sm mr-3 hidden sm:inline">
                  Welcome, <span className="font-medium">{user?.firstName || user?.username}</span>
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-indigo-100 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white"
                >
                  <LogOut size={18} className="mr-1" /> Logout
                </Button>
              </>
            ) : (
              <div className="space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/login")}
                  className="text-indigo-100 hover:bg-indigo-500 hover:bg-opacity-75 hover:text-white"
                >
                  Login
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => navigate("/register")}
                  className="bg-white text-indigo-600 hover:bg-indigo-50"
                >
                  Register
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
