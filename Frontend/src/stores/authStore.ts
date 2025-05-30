import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import authService from "@/services/authService"
import type { User, LoginCredentials, RegisterCredentials } from "@/types"

interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isAdmin: boolean
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  register: (credentials: RegisterCredentials) => Promise<void>
  logout: () => void
  fetchUser: () => Promise<void>
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isAdmin: false,
      isLoading: false,
      error: null,
      login: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          const data = await authService.login(credentials)
          set({
            token: data.token,
            isAuthenticated: true,
            isLoading: false,
          })
          await get().fetchUser() // Fetch user details after login
        } catch (err: any) {
          set({
            error: err.response?.data?.message || "Login failed",
            isLoading: false,
            isAuthenticated: false,
            token: null,
            user: null,
            isAdmin: false,
          })
          throw err
        }
      },
      register: async (credentials) => {
        set({ isLoading: true, error: null })
        try {
          await authService.register(credentials)
          set({ isLoading: false })
        } catch (err: any) {
          // Loguear el objeto de error completo de Axios y la respuesta del backend
          console.error("Axios error object:", err)
          console.error("Full registration error response from backend:", err.response?.data)

          let displayErrorMessage = "Registration failed" // Mensaje por defecto

          if (err.response?.data) {
            const backendResponse = err.response.data
            // Si la respuesta es un string directamente (como en tu caso "Las contraseñas no coinciden" dentro de un token)
            if (typeof backendResponse.token === "string" && backendResponse.token === "Las contraseñas no coinciden") {
              displayErrorMessage = backendResponse.token
            } else if (typeof backendResponse.message === "string") {
              // Si hay un campo message
              displayErrorMessage = backendResponse.message
            } else if (backendResponse.errors && Array.isArray(backendResponse.errors)) {
              // Si hay una lista de errores
              displayErrorMessage = backendResponse.errors
                .map((e: any) => e.defaultMessage || e.message || JSON.stringify(e))
                .join(", ")
            } else if (typeof backendResponse === "string") {
              // Si la respuesta es solo un string
              displayErrorMessage = backendResponse
            }
          }

          set({ error: displayErrorMessage, isLoading: false })
          throw err
        }
      },
      logout: () => {
        // Call logout API if available and needed
        // authService.logout().catch(err => console.error("Logout API call failed", err));
        set({ user: null, token: null, isAuthenticated: false, isAdmin: false, error: null })
      },
      fetchUser: async () => {
        if (!get().token) return
        set({ isLoading: true, error: null })
        try {
          const userData = await authService.getMe()
          set({
            user: userData,
            isAuthenticated: true,
            isAdmin: userData.roles?.includes("ADMIN") || false,
            isLoading: false,
          })
        } catch (err: any) {
          set({
            error: "Failed to fetch user details",
            isLoading: false,
            user: null,
            token: null,
            isAuthenticated: false,
            isAdmin: false,
          })
          // Potentially logout if fetchUser fails due to invalid token
          get().logout()
        }
      },
    }),
    {
      name: "auth-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      partialize: (state) => ({ 
        token: state.token,
        user: state.user,
      isAuthenticated: state.isAuthenticated,
      isAdmin: state.isAdmin,
      
      
      
      }), // Persist only the token
    },
  ),
)
