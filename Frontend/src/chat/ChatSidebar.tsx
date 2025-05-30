"use client"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, MessageSquareText, ChevronLeft, ChevronRight } from "lucide-react"
import { DoublyLinkedList } from "@/utils/dataStructures/DoublyLinkedList"
import type { DLLNode } from "@/utils/dataStructures/Node"

interface ChatSession {
  id: string
  name: string
  lastActivity: string // Or Date object
}

const ChatSidebar = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchSessionsFromBackend = async (): Promise<ChatSession[]> => {
    const res = await fetch("/user/chat/sessions") // Ajusta la URL a tu API real
    if (!res.ok) {
      throw new Error("Failed to fetch sessions")
    }
    return res.json()
  }

  useEffect(() => {
    async function loadSessions() {
      setLoading(true)
      setError(null)
      try {
        const sessionsFromApi = await fetchSessionsFromBackend()
        setSessions(sessionsFromApi)
        if (sessionsFromApi.length > 0) {
          setCurrentSessionId(sessionsFromApi[0].id)
        }
      } catch (e) {
        setError("Failed to load sessions")
      } finally {
        setLoading(false)
      }
    }
    loadSessions()
  }, [])

  const sessionDLL = useMemo(() => {
    const dll = new DoublyLinkedList<ChatSession>()
    sessions.forEach((session) => dll.append(session))
    return dll
  }, [sessions])

  const [currentNode, setCurrentNode] = useState<DLLNode<ChatSession> | null>(null)

  useEffect(() => {
    if (currentSessionId) {
      setCurrentNode(sessionDLL.findNodeBy((node) => node.value.id === currentSessionId))
    } else if (sessionDLL.head) {
      setCurrentNode(sessionDLL.head)
    }
  }, [currentSessionId, sessionDLL])

  const handleSelectSession = (sessionId: string) => {
    setCurrentSessionId(sessionId)
  }

  const handleNewChat = () => {
    const newId = (sessions.length + 1).toString()
    const newSession: ChatSession = { id: newId, name: "New Chat", lastActivity: new Date().toLocaleDateString() }
    setSessions((prev) => [newSession, ...prev])
    setCurrentSessionId(newId)
    alert("New chat created (mock)")
  }

  const navigatePrevSession = () => {
    if (currentNode?.prev) {
      setCurrentNode(currentNode.prev)
      setCurrentSessionId(currentNode.prev.value.id)
    }
  }

  const navigateNextSession = () => {
    if (currentNode?.next) {
      setCurrentNode(currentNode.next)
      setCurrentSessionId(currentNode.next.value.id)
    }
  }

  return (
    <aside className="w-72 bg-slate-100 border-r border-slate-200 flex flex-col p-4">
      <Button onClick={handleNewChat} className="w-full bg-indigo-600 hover:bg-indigo-700 mb-4">
        <PlusCircle size={18} className="mr-2" /> New Chat
      </Button>

      <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Chat Sessions</h2>

      {loading && <p>Loading sessions...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {sessions.length > 0 && currentNode && (
        <div className="flex items-center justify-between mb-3 p-2 border border-slate-300 rounded-md bg-white">
          <Button
            variant="ghost"
            size="icon"
            onClick={navigatePrevSession}
            disabled={!currentNode?.prev}
            className="h-7 w-7"
          >
            <ChevronLeft size={18} />
          </Button>
          <span className="text-sm font-medium text-slate-700 truncate" title={currentNode.value.name}>
            {currentNode.value.name}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={navigateNextSession}
            disabled={!currentNode?.next}
            className="h-7 w-7"
          >
            <ChevronRight size={18} />
          </Button>
        </div>
      )}

      <div className="flex-grow overflow-y-auto space-y-1 pr-1">
        {sessions.map((session) => (
          <button
            key={session.id}
            onClick={() => handleSelectSession(session.id)}
            className={`w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors flex items-center
              ${
                session.id === currentSessionId
                  ? "bg-indigo-100 text-indigo-700 font-medium"
                  : "text-slate-600 hover:bg-slate-200"
              }`}
          >
            <MessageSquareText size={16} className="mr-2.5 opacity-70" />
            <span className="flex-grow truncate">{session.name}</span>
          </button>
        ))}
        {sessions.length === 0 && !loading && !error && (
          <p className="text-sm text-slate-500 text-center py-4">No chat sessions yet.</p>
        )}
      </div>
    </aside>
  )
}

export default ChatSidebar
