"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { apiClient, type ChatMessage, type ChatSession } from "../lib/api"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Bot, User, Send, MessageSquare, Plus } from "lucide-react"

export const Chat: React.FC = () => {
  const { user } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [sessionsLoading, setSessionsLoading] = useState(true)
  const [error, setError] = useState("")

  // Load chat sessions on component mount
  useEffect(() => {
    loadChatSessions()
  }, [])

  // Load messages when session changes
  useEffect(() => {
    if (currentSessionId) {
      loadChatHistory(currentSessionId)
    } else {
      setMessages([])
    }
  }, [currentSessionId])

  const loadChatSessions = async () => {
    try {
      setSessionsLoading(true)
      const sessionsData = await apiClient.getChatSessions()
      setSessions(sessionsData)
      console.log("📦 Sesiones recibidas:", sessionsData)

      // Auto-select the most recent session if available
        if (sessionsData.length > 0) {
          // Mantiene la sesión actual si existe, si no, selecciona la más reciente
          setCurrentSessionId(prev => prev || sessionsData[0].sessionId);
        }
    } catch (error) {
      console.error("Failed to load chat sessions:", error)
      setError("Failed to load chat sessions")
    } finally {
      setSessionsLoading(false)
    }
  }

  const loadChatHistory = async (sessionId: string) => {
    try {
      setLoading(true)
      const history = await apiClient.getChatHistory(sessionId)
      setMessages(history?.messages ?? [])

    } catch (error) {
      console.error("Failed to load chat history:", error)
      setError("Failed to load chat history")
    } finally {
      setLoading(false)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const sessionId = currentSessionId || generateSessionId();

    try {
      setLoading(true);
      setError("");

      // 1. Envía el mensaje al backend y recibe ambos mensajes (usuario + bot)
      const response = await apiClient.sendMessage({
        content: newMessage,
        sessionId,
      });

      // 2. Agrega ambos mensajes (usuario y bot) al estado
      setMessages((prev) => [...prev, ...(response ?? [])])


      // 3. Si es una sesión nueva, actualiza la lista de sesiones
      if (!currentSessionId) {
        setCurrentSessionId(sessionId);
        await loadChatSessions();
        
      }

      // 4. Limpia el campo de entrada
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
      setError(error instanceof Error ? error.message : "Failed to send message");
    } finally {
      setLoading(false);
    }
  };



  const handleNewChat = () => {
    setCurrentSessionId(null)
    setMessages([])
    setNewMessage("")
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const generateSessionId = () => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar with chat sessions */}
      <div className="w-64 bg-muted/30 border-r border-border">
        <div className="p-4 border-b border-border">
          <Button onClick={handleNewChat} className="w-full flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>New Chat</span>
          </Button>
        </div>

        <div className="p-4">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Chat Sessions</h3>

          {sessionsLoading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-muted rounded animate-pulse" />
              ))}
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No chat sessions yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {sessions.map((session) => (
                <button
                  key={session.sessionId}
                  onClick={() => setCurrentSessionId(session.sessionId)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    currentSessionId === session.sessionId
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted text-muted-foreground"
                  }`}
                >
                  <div className="font-medium text-sm truncate">{session.title || "New Chat"}</div>
                  <div className="text-xs opacity-70 mt-1">
                    {session.updatedAt ? new Date(session.updatedAt).toLocaleDateString() : "No Date"}
                  </div>
                </button>
              ))}

            </div>
          )}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-semibold">Medical Chat Assistant</h1>
              <p className="text-sm text-muted-foreground">
                Welcome, {user?.firstName}! Ask me anything about medications or health information.
              </p>
            </div>
            <Badge variant="secondary">Online</Badge>
          </div>
        </div>

        {error && (
          <div className="p-4">
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 && !loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Bot className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">Welcome to PharmaSync</h3>
                <p className="text-muted-foreground max-w-md">
                  Your AI-powered medical assistant. Ask questions about medications, drug interactions, dosages, and
                  more.
                </p>
              </div>
            </div>
          ) : (
            messages.map((message, index) => (
              <div
                key={message.id ?? `${message.sessionId}-${index}`}
                className={`flex items-start space-x-3 ${message.isUser ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.isUser ? "bg-primary" : "bg-muted"
                  }`}
                >
                  {message.isUser ? (
                    <User className="h-4 w-4 text-primary-foreground" />
                  ) : (
                    <Bot className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>

                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.isUser ? "text-primary-foreground/70" : "text-muted-foreground/70"
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}

          {loading && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                <Bot className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="bg-muted rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message input */}
        <div className="border-t border-border p-4">
          <div className="flex space-x-2">
            <Textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about medications, symptoms, or health information..."
              className="flex-1 min-h-[60px] resize-none"
              disabled={loading}
            />
            <Button onClick={handleSendMessage} disabled={!newMessage.trim() || loading} className="self-end">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
