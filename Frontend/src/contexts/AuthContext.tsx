"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, type ReactNode } from "react"
import { apiClient, type User, type LoginRequest, type RegisterRequest } from "../lib/api"

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>
  register: (userData: RegisterRequest) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
  isAdmin: () => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

type AuthAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_USER"; payload: { user: User; token: string } }
  | { type: "UPDATE_USER"; payload: User }
  | { type: "LOGOUT" }

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload }
    case "SET_USER":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
      }
    case "UPDATE_USER":
      return {
        ...state,
        user: action.payload,
      }
    case "LOGOUT":
      return {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
      }
    default:
      return state
  }
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    // Check for existing auth on mount
    const initializeAuth = async () => {
      const token = localStorage.getItem("pharmasync_token")
      const userStr = localStorage.getItem("pharmasync_user")

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr)

          // Verify token is still valid by fetching current user
          try {
            const currentUser = await apiClient.getCurrentUser()
            dispatch({ type: "SET_USER", payload: { user: currentUser, token } })
          } catch (error) {
            // Token is invalid, clear storage
            localStorage.removeItem("pharmasync_token")
            localStorage.removeItem("pharmasync_user")
            dispatch({ type: "LOGOUT" })
          }
        } catch (error) {
          // Invalid stored data, clear storage
          localStorage.removeItem("pharmasync_token")
          localStorage.removeItem("pharmasync_user")
          dispatch({ type: "LOGOUT" })
        }
      } else {
        dispatch({ type: "SET_LOADING", payload: false })
      }
    }

    initializeAuth()
  }, [])

  const login = async (credentials: LoginRequest) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const response = await apiClient.login(credentials)

      // Store token and user data
      localStorage.setItem("pharmasync_token", response.token)
      localStorage.setItem("pharmasync_user", JSON.stringify(response.user))

      dispatch({ type: "SET_USER", payload: { user: response.user, token: response.token } })
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false })
      throw error
    }
  }

  const register = async (userData: RegisterRequest) => {
    dispatch({ type: "SET_LOADING", payload: true })

    try {
      const response = await apiClient.register(userData)

      // Store token and user data
      localStorage.setItem("pharmasync_token", response.token)
      localStorage.setItem("pharmasync_user", JSON.stringify(response.user))

      dispatch({ type: "SET_USER", payload: { user: response.user, token: response.token } })
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false })
      throw error
    }
  }

  const logout = async () => {
    try {
      // Call backend logout endpoint
      await apiClient.logout()
    } catch (error) {
      console.error("Logout API call failed:", error)
      // Continue with local logout even if API call fails
    } finally {
      // Always clean up local storage
      localStorage.removeItem("pharmasync_token")
      localStorage.removeItem("pharmasync_user")
      dispatch({ type: "LOGOUT" })
    }
  }

const refreshUser = async () => {
  try {
    const currentUser = await apiClient.getCurrentUser()
    localStorage.setItem("pharmasync_user", JSON.stringify(currentUser))
    dispatch({ type: "UPDATE_USER", payload: currentUser })
  } catch (error) {
    console.warn("⚠️ No se pudo refrescar el usuario. Detalles:", error)

    // En desarrollo, evita borrar el token automáticamente:
    const isDev = import.meta.env.DEV || window.location.hostname === "localhost"
    if (!isDev) {
      await logout()
    } else {
      console.warn("🔁 Continuamos sin cerrar sesión automáticamente (modo desarrollo)")
    }
  }
}


  const isAdmin = () =>
  Array.isArray(state.user?.roles) &&
  state.user.roles.some((r) => r.toUpperCase() === "ADMIN")

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        refreshUser,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
