"use client"

import React, { useState, useEffect } from "react"
import type { ChatSession, ChatMessage } from "../types"
import { apiClient } from "../lib/api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageSquare, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import { useCarousel } from "../hooks/useCarousel"

export const History: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [loading, setLoading] = useState(true)
  const [messagesLoading, setMessagesLoading] = useState(false)

  const {
    currentItem: selectedSession,
    currentIndex,
    itemCount,
    next,
    previous,
    goTo,
  } = useCarousel<ChatSession>(sessions)

  useEffect(() => {
    loadSessions()
  }, [])

  // Cuando cambia la sesión seleccionada, carga mensajes automáticamente
  useEffect(() => {
    if (selectedSession) {
      loadMessages(selectedSession.id)
    } else {
      setMessages([])
    }
  }, [selectedSession])

  const loadSessions = async () => {
    try {
      const sessionsData = await apiClient.getChatSessions()
      setSessions(sessionsData)
    } catch (error) {
      console.error("Failed to load sessions:", error)
    } finally {
      setLoading(false)
    }
  }

  const loadMessages = async (sessionId: string) => {
    setMessagesLoading(true)
    try {
      const messagesData = await apiClient.getChatHistory(sessionId)
      setMessages(messagesData)
    } catch (error) {
      console.error("Failed to load messages:", error)
    } finally {
      setMessagesLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen pt-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Chat History</h1>
        <p className="text-gray-600 mt-2">View your previous conversations with the medical assistant</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Sessions</span>
              </CardTitle>
              <CardDescription>
                {sessions.length} chat session{sessions.length !== 1 ? "s" : ""}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sessions.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No chat sessions found</p>
              ) : (
                <div className="space-y-2">
                  {sessions.map((session, index) => (
                    <Button
                      key={session.id}
                      variant={selectedSession?.id === session.id ? "default" : "outline"}
                      className="w-full justify-start text-left h-auto p-3"
                      onClick={() => goTo(session)}
                    >
                      <div>
                        <div className="font-medium truncate">{session.title || "Untitled Chat"}</div>
                        <div className="text-xs opacity-70 flex items-center space-x-1 mt-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="flex justify-between items-center">
              <div>
                <CardTitle>{selectedSession ? selectedSession.title || "Chat Session" : "Select a Session"}</CardTitle>
                {selectedSession && (
                  <CardDescription>Created on {new Date(selectedSession.createdAt).toLocaleDateString()}</CardDescription>
                )}
              </div>
              <div className="space-x-2">
                <Button variant="outline" size="sm" onClick={previous} disabled={itemCount <= 1}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={next} disabled={itemCount <= 1}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="h-full overflow-y-auto flex-grow">
              {!selectedSession ? (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Select a chat session to view its history</p>
                  </div>
                </div>
              ) : messagesLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          message.isUser ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <p className={`text-xs mt-1 ${message.isUser ? "text-blue-100" : "text-gray-500"}`}>
                          {new Date(message.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
