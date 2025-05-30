"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, CornerDownLeft } from "lucide-react"

interface ChatInputProps {
  onSendMessage: (messageContent: string) => void // Esta prop la usaremos
  isLoading?: boolean
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState("")

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault()
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim())
      setInputValue("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-3 sm:p-4 bg-slate-100 border-t border-slate-200">
      <div className="flex items-start space-x-3">
        <textarea
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje aquí... (Shift+Enter para nueva línea)"
          className="flex-grow p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow text-sm min-h-[52px] max-h-32"
          rows={1}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading || !inputValue.trim()} className="h-[52px] px-4">
          {isLoading ? (
            <div className="flex items-center space-x-1">
              <span className="h-1.5 w-1.5 bg-white rounded-full animate-pulse delay-75"></span>
              <span className="h-1.5 w-1.5 bg-white rounded-full animate-pulse delay-150"></span>
              <span className="h-1.5 w-1.5 bg-white rounded-full animate-pulse delay-300"></span>
            </div>
          ) : (
            <>
              <Send size={18} className="mr-0 sm:mr-2" />
              <span className="hidden sm:inline">Enviar</span>
            </>
          )}
        </Button>
      </div>
      <p className="text-xs text-slate-500 mt-1.5 ml-1 flex items-center">
        <CornerDownLeft size={12} className="mr-1" /> Shift+Enter para nueva línea.
      </p>
    </form>
  )
}

export default ChatInput
