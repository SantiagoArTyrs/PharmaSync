export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "USER" | "ADMIN"
  createdAt: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
}

export interface ChatMessage {
  id: string
  content: string
  isUser: boolean
  timestamp: string
  sessionId: string
}

export interface ChatSession {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  messageCount: number
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterCredentials {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}
