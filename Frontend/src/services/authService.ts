import api from "./api"
import type { User, LoginCredentials, RegisterCredentials, AuthResponse } from "@/types"

const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", credentials)
    return response.data
  },
  register: async (credentials: RegisterCredentials): Promise<User> => {
    // Assuming register returns User or some confirmation
    const response = await api.post<User>("/auth/register", credentials)
    return response.data
  },
  getMe: async (): Promise<User> => {
    const response = await api.get<User>("/auth/me")
    return response.data
  },
  logout: async (): Promise<void> => {
    // Optional: if your backend has a logout endpoint
    // await api.post('/auth/logout');
    return Promise.resolve()
  },
  // registerAdmin is intentionally not included here for UI exposure
}

export default authService
