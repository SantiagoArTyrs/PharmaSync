import api from "./api"
import type { ChatMessageResponse, ChatSession } from "@/types"
import { useAuthStore } from "@/stores/authStore"

export interface ChatMessageRequestData {
  content: string
  sessionId: string
  sender: "user"
}

const chatService = {
  sendMessage: async (requestData: ChatMessageRequestData): Promise<ChatMessageResponse[]> => {
    const token = useAuthStore.getState().token

    const response = await api.post<ChatMessageResponse[]>("/user/chat/send", requestData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  },

  getChatSessions: async (): Promise<ChatSession[]> => {
    const token = useAuthStore.getState().token

    const response = await api.get<ChatSession[]>("/user/chat/sessions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  },

  getChatHistory: async (sessionId: string): Promise<ChatSession> => {
    const token = useAuthStore.getState().token

    const response = await api.get<ChatSession>(`/user/chat/history/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  },

  deleteChatSession: async (sessionId: string): Promise<string> => {
    const token = useAuthStore.getState().token

    const response = await api.delete<string>(`/user/chat/sessions/${sessionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  },
}

export default chatService
