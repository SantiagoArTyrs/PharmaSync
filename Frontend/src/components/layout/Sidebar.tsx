"use client"

import type React from "react"
import { useEffect, useState } from "react"
import type { ChatSession } from "../../types"
import { apiClient } from "../../lib/api"
import { Button } from "@/components/ui/button"
import { Plus, MessageSquare } from "lucide-react"
import { useAuth } from "../../contexts/AuthContext"

interface SidebarProps {
  selectedSessionId: string | null
  onSessionSelect: (sessionId: string) => void
  onNewChat: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ selectedSessionId, onSessionSelect, onNewChat }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [loading, setLoading] = useState(true)
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      loadSessions()
    }
  }, [isAuthenticated])

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

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <Button onClick={onNewChat} className="w-full flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>New Chat</span>
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-sm font-medium text-gray-500 mb-3">Chat Sessions</h3>

          {loading ? (
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-12 bg-gray-200 rounded animate-pulse" />
              ))}
            </div>
          ) : sessions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No chat sessions yet</p>
            </div>
          ) : (
            <div className="space-y-1">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => onSessionSelect(session.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedSessionId === session.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="font-medium text-sm truncate">{session.title || "New Chat"}</div>
                  <div className="text-xs text-gray-500 mt-1">{new Date(session.updatedAt).toLocaleDateString()}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
