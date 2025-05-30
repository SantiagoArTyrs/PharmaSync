"use client"

// This component is a conceptual demonstration for Doubly Linked List.
// It would typically be part of your Sidebar or ChatSessionList.
import type React from "react"
import { useState, useEffect, useMemo } from "react"
import { DoublyLinkedList } from "@/utils/dataStructures/DoublyLinkedList"
import type { DLLNode } from "@/utils/dataStructures/Node"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SessionNavigatorProps {
  sessionIds: string[] // Array of session IDs
  onSessionChange: (sessionId: string) => void
  initialSessionId?: string
}

const SessionNavigator: React.FC<SessionNavigatorProps> = ({ sessionIds, onSessionChange, initialSessionId }) => {
  const sessionList = useMemo(() => {
    const dll = new DoublyLinkedList<string>()
    sessionIds.forEach((id) => dll.append(id))
    return dll
  }, [sessionIds])

  const [currentNode, setCurrentNode] = useState<DLLNode<string> | null>(null)

  useEffect(() => {
    if (sessionList.head) {
      let startNode = sessionList.head
      if (initialSessionId) {
        const foundNode = sessionList.findNode(initialSessionId)
        if (foundNode) startNode = foundNode
      }
      setCurrentNode(startNode)
      if (startNode) onSessionChange(startNode.value)
    }
  }, [sessionList, initialSessionId, onSessionChange])

  const navigatePrev = () => {
    if (currentNode?.prev) {
      setCurrentNode(currentNode.prev)
      onSessionChange(currentNode.prev.value)
    }
  }

  const navigateNext = () => {
    if (currentNode?.next) {
      setCurrentNode(currentNode.next)
      onSessionChange(currentNode.next.value)
    }
  }

  if (!currentNode) {
    return <p className="text-sm text-muted-foreground">No sessions to navigate.</p>
  }

  return (
    <div className="flex items-center space-x-2 p-2 border rounded-md bg-gray-50">
      <button
        onClick={navigatePrev}
        disabled={!currentNode.prev}
        className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Previous Session"
      >
        <ChevronLeft size={20} />
      </button>
      <span className="text-sm font-medium text-gray-700 truncate w-32 text-center" title={currentNode.value}>
        Session: {currentNode.value.substring(0, 10)}...
      </span>
      <button
        onClick={navigateNext}
        disabled={!currentNode.next}
        className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
        title="Next Session"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  )
}

export default SessionNavigator
