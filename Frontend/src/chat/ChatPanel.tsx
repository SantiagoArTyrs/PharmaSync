"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import MessageBubble, { type Message } from "./MessageBubble"
import { Bot } from "lucide-react" // <--- ESTA ES LA LÍNEA IMPORTANTE A VERIFICAR/CORREGIR

interface ChatPanelProps {
  messages: Message[]
  isLoading?: boolean // To show a typing indicator, for example
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, isLoading }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div ref={scrollRef} className="flex-grow p-4 sm:p-6 overflow-y-auto bg-white">
      {messages.length === 0 && !isLoading && (
        <div className="flex flex-col items-center justify-center h-full text-slate-500">
          <Bot size={48} className="mb-4 opacity-50" />
          <p className="text-lg font-medium">PharmaSync AI</p>
          <p className="text-sm">Pregúntame sobre medicamentos o información de salud.</p>
        </div>
      )}
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      {isLoading &&
        messages.length > 0 && ( // Show typing indicator if loading and there are prior messages
          <div className="flex items-start gap-3 my-3 justify-start">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center">
              <Bot size={18} />
            </div>
            <div className="max-w-[70%] p-3 rounded-xl shadow-sm bg-slate-200 text-slate-800 rounded-bl-none">
              <div className="flex items-center space-x-1">
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse delay-75"></span>
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse delay-150"></span>
                <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse delay-300"></span>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default ChatPanel
