import axios, { type AxiosInstance, type AxiosResponse } from "axios"

// Types for API responses
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  user: User
  token: string
}

export interface RegisterRequest {
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "USER" | "ADMIN"
  createdAt: string
}

export interface ClinicalSummary {
  id: string
  question: string
  answer: string
  type: "interaction" | "symptom" | "general"
  timestamp: string
  userId: string
  sessionId: string
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

export interface SendMessageRequest {
  content: string
  sessionId: string
}

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api",
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000, // 10 seconds timeout
    })

    // Request interceptor to add auth token
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("pharmasync_token")
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => {
        console.error("Request interceptor error:", error)
        return Promise.reject(error)
      },
    )

    // Response interceptor to handle auth errors and responses
    this.client.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error) => {
        console.error("API Error:", error.response?.data || error.message)

        // Handle 401 Unauthorized - redirect to login
        if (error.response?.status === 401) {
          localStorage.removeItem("pharmasync_token")
          localStorage.removeItem("pharmasync_user")
          window.location.href = "/"
        }

        // Handle network errors
        if (!error.response) {
          throw new Error("Network error - please check your connection")
        }

        // Throw the error with a user-friendly message
        const message = error.response?.data?.message || error.response?.data?.error || "An error occurred"
        throw new Error(message)
      },
    )
  }

  // Authentication endpoints
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await this.client.post<LoginResponse>("/auth/login", credentials)
      return response.data
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  async register(userData: RegisterRequest): Promise<LoginResponse> {
    try {
      const response = await this.client.post<LoginResponse>("/auth/register", userData)
      return response.data
    } catch (error) {
      console.error("Register error:", error)
      throw error
    }
  }

  async registerAdmin(userData: RegisterRequest): Promise<LoginResponse> {
    try {
      const response = await this.client.post<LoginResponse>("/auth/register-admin", userData)
      return response.data
    } catch (error) {
      console.error("Admin register error:", error)
      throw error
    }
  }

  async logout(): Promise<void> {
    try {
      await this.client.post("/auth/logout")
    } catch (error) {
      console.error("Logout error:", error)
      // Don't throw error for logout - always clean up locally
    }
  }

  // Clinical Summary endpoints
  async getAllClinicalSummaries(): Promise<ClinicalSummary[]> {
    try {
      const response = await this.client.get<ClinicalSummary[]>("/summary/all")
      return response.data
    } catch (error) {
      console.error("Get all clinical summaries error:", error)
      throw error
    }
  }

  async getClinicalSummariesByUser(userId: string): Promise<ClinicalSummary[]> {
    try {
      const response = await this.client.get<ClinicalSummary[]>(`/summary/user/${userId}`)
      return response.data
    } catch (error) {
      console.error("Get clinical summaries by user error:", error)
      throw error
    }
  }

  async getClinicalSummariesBySession(sessionId: string): Promise<ClinicalSummary[]> {
    try {
      const response = await this.client.get<ClinicalSummary[]>(`/summary/session/${sessionId}`)
      return response.data
    } catch (error) {
      console.error("Get clinical summaries by session error:", error)
      throw error
    }
  }

  async getClinicalSummariesByType(type: "interaction" | "symptom" | "general"): Promise<ClinicalSummary[]> {
    try {
      const response = await this.client.get<ClinicalSummary[]>(`/summary/type/${type}`)
      return response.data
    } catch (error) {
      console.error("Get clinical summaries by type error:", error)
      throw error
    }
  }

  // Chat endpoints
  async sendMessage(request: SendMessageRequest): Promise<ChatMessage> {
    try {
      const response = await this.client.post<ChatMessage>("/user/chat/send", request)
      return response.data
    } catch (error) {
      console.error("Send message error:", error)
      throw error
    }
  }

  async getChatHistory(sessionId: string): Promise<ChatMessage[]> {
    try {
      const response = await this.client.get<ChatMessage[]>(`/user/chat/history/${sessionId}`)
      return response.data
    } catch (error) {
      console.error("Get chat history error:", error)
      throw error
    }
  }

  async getChatSessions(): Promise<ChatSession[]> {
    const response = await this.client.get<ChatSession[]>("/user/chat/sessions")
    return response.data
  }


  // Admin endpoints
  async getAllUsers(): Promise<User[]> {
    try {
      const response = await this.client.get<User[]>("/admin/users")
      return response.data
    } catch (error) {
      console.error("Get all users error:", error)
      throw error
    }
  }

  async deleteUser(userId: string): Promise<void> {
    try {
      await this.client.delete(`/admin/users/${userId}`)
    } catch (error) {
      console.error("Delete user error:", error)
      throw error
    }
  }

  // User profile endpoints
  async getCurrentUser(): Promise<User> {
    try {
      const response = await this.client.get<User>("/auth/me")
      return response.data
    } catch (error) {
      console.error("Get current user error:", error)
      throw error
    }
  }

  async updateProfile(userData: Partial<User>): Promise<User> {
    try {
      const response = await this.client.put<User>("/auth/profile", userData)
      return response.data
    } catch (error) {
      console.error("Update profile error:", error)
      throw error
    }
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient()
