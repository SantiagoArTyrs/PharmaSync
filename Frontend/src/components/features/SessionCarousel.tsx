"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react"
import { useCarousel } from "@/hooks/useCarousel"

interface ChatSession {
  id: string
  title: string
  messageCount: number
  lastActivity: string
  isActive?: boolean
}

interface SessionCarouselProps {
  sessions: ChatSession[]
  onSessionSelect?: (session: ChatSession) => void
  autoAdvance?: boolean
}

export const SessionCarousel: React.FC<SessionCarouselProps> = ({ sessions, onSessionSelect, autoAdvance = false }) => {
  const [isAutoAdvancing, setIsAutoAdvancing] = React.useState(autoAdvance)

  const {
    currentItem: currentSession,
    currentIndex,
    itemCount,
    next,
    previous,
    goTo,
  } = useCarousel<ChatSession>(sessions, {
    autoAdvance: isAutoAdvancing,
    autoAdvanceInterval: 4000,
  })

  const handleSessionClick = (session: ChatSession) => {
    goTo(session)
    onSessionSelect?.(session)
  }

  const toggleAutoAdvance = () => {
    setIsAutoAdvancing(!isAutoAdvancing)
  }

  if (!currentSession) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">No sessions available</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Chat Sessions</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={toggleAutoAdvance}>
              {isAutoAdvancing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Badge variant="secondary">
              {currentIndex + 1} / {itemCount}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main session display */}
        <div
          className="p-4 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => handleSessionClick(currentSession)}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg truncate">{currentSession.title || "Untitled Session"}</h3>
            {currentSession.isActive && <Badge className="bg-green-100 text-green-800">Active</Badge>}
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>{currentSession.messageCount} messages</p>
            <p>Last activity: {new Date(currentSession.lastActivity).toLocaleDateString()}</p>
          </div>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={previous} disabled={itemCount <= 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {/* Dot indicators */}
          <div className="flex space-x-1">
            {sessions.slice(0, Math.min(5, sessions.length)).map((session, index) => (
              <button
                key={session.id}
                onClick={() => goTo(session)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex % 5 ? "bg-primary" : "bg-muted-foreground/30"
                }`}
              />
            ))}
            {sessions.length > 5 && <span className="text-xs text-muted-foreground">...</span>}
          </div>

          <Button variant="outline" size="sm" onClick={next} disabled={itemCount <= 1}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Session list preview */}
        <div className="max-h-32 overflow-y-auto space-y-1">
          {sessions.map((session, index) => (
            <button
              key={session.id}
              onClick={() => handleSessionClick(session)}
              className={`w-full text-left p-2 rounded text-sm transition-colors ${
                index === currentIndex ? "bg-primary/10 text-primary" : "hover:bg-muted"
              }`}
            >
              <div className="truncate font-medium">{session.title || "Untitled Session"}</div>
              <div className="text-xs text-muted-foreground">{session.messageCount} messages</div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
