"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Wifi, WifiOff, Send, Clock, RefreshCw, AlertCircle } from "lucide-react"
import { useOfflineQueue } from "@/hooks/useOfflineQueue"
import { apiClient } from "@/lib/api"

interface PendingMessage {
  id: string
  content: string
  sessionId: string
  timestamp: number
}

interface OfflineMessageManagerProps {
  onMessageSent?: (message: PendingMessage) => void
  onMessageFailed?: (message: PendingMessage) => void
}

export const OfflineMessageManager: React.FC<OfflineMessageManagerProps> = ({ onMessageSent, onMessageFailed }) => {
  const { enqueue, isOnline, queueSize, isProcessing, forceProcess } = useOfflineQueue<PendingMessage>({
    maxRetries: 3,
    processItem: async (message) => {
      try {
        await apiClient.sendMessage({
          content: message.content,
          sessionId: message.sessionId,
        })
        return true
      } catch (error) {
        console.error("Failed to send message:", error)
        return false
      }
    },
    onSuccess: onMessageSent,
    onFailure: onMessageFailed,
  })

  const sendMessage = (content: string, sessionId: string) => {
    const message: PendingMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      content,
      sessionId,
      timestamp: Date.now(),
    }
    enqueue(message)
  }

  // Example usage component
  const [testMessage, setTestMessage] = React.useState("")
  const [testSessionId] = React.useState("test_session")

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Offline Message Manager</span>
          <div className="flex items-center space-x-2">
            {isOnline ? (
              <Badge className="bg-green-100 text-green-800">
                <Wifi className="h-3 w-3 mr-1" />
                Online
              </Badge>
            ) : (
              <Badge variant="destructive">
                <WifiOff className="h-3 w-3 mr-1" />
                Offline
              </Badge>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {queueSize > 0 && (
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertDescription>
              {queueSize} message{queueSize > 1 ? "s" : ""} pending
              {isProcessing && " (processing...)"}
            </AlertDescription>
          </Alert>
        )}

        {!isOnline && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              You're offline. Messages will be queued and sent when connection is restored.
            </AlertDescription>
          </Alert>
        )}

        {/* Test Interface */}
        <div className="space-y-2">
          <input
            type="text"
            value={testMessage}
            onChange={(e) => setTestMessage(e.target.value)}
            placeholder="Test message..."
            className="w-full p-2 border rounded"
          />
          <div className="flex space-x-2">
            <Button
              onClick={() => {
                if (testMessage.trim()) {
                  sendMessage(testMessage, testSessionId)
                  setTestMessage("")
                }
              }}
              disabled={!testMessage.trim()}
              className="flex-1"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            {queueSize > 0 && (
              <Button variant="outline" onClick={forceProcess} disabled={isProcessing}>
                <RefreshCw className={`h-4 w-4 ${isProcessing ? "animate-spin" : ""}`} />
              </Button>
            )}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Queue size: {queueSize} | Status: {isOnline ? "Connected" : "Disconnected"} | Processing:{" "}
          {isProcessing ? "Yes" : "No"}
        </div>
      </CardContent>
    </Card>
  )
}
