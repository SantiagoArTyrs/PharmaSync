"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Undo, Redo, RotateCcw } from "lucide-react"
import { useUndoRedo } from "@/hooks/useUndoRedo"

interface MessageEditorProps {
  initialMessage?: string
  onSave?: (message: string) => void
}

export const MessageEditor: React.FC<MessageEditorProps> = ({ initialMessage = "", onSave }) => {
  const {
    state: message,
    execute,
    undo,
    redo,
    canUndo,
    canRedo,
    clear,
  } = useUndoRedo({
    initialState: initialMessage,
    maxSize: 50,
  })

  const [localMessage, setLocalMessage] = useState(message)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setLocalMessage(e.target.value)
  }

  const saveChange = () => {
    if (localMessage !== message) {
      execute(localMessage)
    }
  }

  const handleUndo = () => {
    undo()
    setLocalMessage(message)
  }

  const handleRedo = () => {
    redo()
    setLocalMessage(message)
  }

  const handleSave = () => {
    saveChange()
    onSave?.(message)
  }

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Message Editor</span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleUndo} disabled={!canUndo} title="Undo (Ctrl+Z)">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleRedo} disabled={!canRedo} title="Redo (Ctrl+Y)">
              <Redo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={clear} title="Clear All">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          value={localMessage}
          onChange={handleChange}
          onBlur={saveChange}
          placeholder="Type your message here..."
          className="min-h-[120px] resize-none"
        />
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">{localMessage.length} characters</div>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setLocalMessage(message)}>
              Reset
            </Button>
            <Button onClick={handleSave}>Save Message</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
