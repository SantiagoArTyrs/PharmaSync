"use client"

import { useState, useEffect } from "react"
import ChatPanel from "@/chat/ChatPanel"
import ChatInput from "@/chat/ChatInput"
import type { UIMessage } from "@/types"
import chatService from "@/services/chatService"
import { useAuthStore } from "@/stores/authStore"
import { v4 as uuidv4 } from "uuid"

const ChatPage = () => {
  const { user } = useAuthStore()
  const [messages, setMessages] = useState<UIMessage[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!currentSessionId) {
      // Puedes generar sesión aquí si quieres
      // setCurrentSessionId(uuidv4());
    }
  }, [currentSessionId])

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return

    const sessionIdToUse = currentSessionId || uuidv4()
    if (!currentSessionId) {
      setCurrentSessionId(sessionIdToUse)
    }

    const userMessage: UIMessage = {
      id: uuidv4(),
      content,
      role: "user",
      createdAt: new Date(),
      sessionId: sessionIdToUse,
    }

    setMessages((prev) => [...prev, userMessage])
    setError(null)
    setIsLoading(true)

    try {
      type BackendMessage = {
        id: string
        content: string
        isUser: boolean
        timestamp: string
        sessionId: string
      }

      const responseMessages: BackendMessage[] = await chatService.sendMessage({
        content,
        sessionId: sessionIdToUse,
        sender: "user",
      })

      const newBackendMessages: UIMessage[] = responseMessages.map((msg) => ({
        id: msg.id,
        content: msg.content,
        role: msg.isUser ? "user" : "assistant",
        createdAt: msg.timestamp ? new Date(msg.timestamp) : undefined,
        sessionId: msg.sessionId,
      }))

      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== userMessage.id)
        return [...filtered, ...newBackendMessages]
      })
    } catch (err: any) {
      console.error("Failed to send message:", err)
      setError(err?.message || "Error al enviar el mensaje.")
      setMessages((prev) => prev.filter((m) => m.id !== userMessage.id))
    } finally {
      setIsLoading(false)
    }
  }

  const welcomeMessage = user
    ? `Bienvenido, ${user.firstName ?? user.username}! Pregúntame sobre medicamentos o información de salud.`
    : "Pregúntame sobre medicamentos o información de salud."

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 sm:p-6 border-b border-slate-200 bg-slate-50">
        <h1 className="text-xl sm:text-2xl font-semibold text-slate-800">Asistente Médico de Chat</h1>
        <p className="text-sm text-slate-500">{welcomeMessage}</p>
        {error && (
          <div className="mt-2 p-2 bg-red-100 text-red-700 text-xs rounded-md">
            Error: {error}
          </div>
        )}
      </div>

      <ChatPanel
        messages={messages.map((msg) => ({
          ...msg,
          createdAt: typeof msg.createdAt === "string" ? new Date(msg.createdAt) : msg.createdAt,
        }))}
        isLoading={isLoading}
      />
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  )
}

export default ChatPage
