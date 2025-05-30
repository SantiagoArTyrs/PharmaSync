import type React from "react"
import { User, Bot, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Message {
  id: string
  content: string
  role: "user" | "assistant" | "system" // 'system' messages usually aren't displayed
  createdAt?: Date // Or string timestamp
}

interface MessageBubbleProps {
  message: Message
}

const formatTimestamp = (date?: Date): string => {
  if (!date) return ""
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === "user"
  const timestamp = message.createdAt ? formatTimestamp(new Date(message.createdAt)) : ""

  if (message.role === "system") {
    return null // Typically, system messages are not displayed directly
  }

  return (
    <div className={cn("flex items-start gap-3 my-3", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center">
          <Bot size={18} />
        </div>
      )}
      <div
        className={cn(
          "max-w-[70%] p-3 rounded-xl shadow-sm",
          isUser ? "bg-indigo-600 text-white rounded-br-none" : "bg-slate-200 text-slate-800 rounded-bl-none",
        )}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        {timestamp && (
          <div className={cn("text-xs mt-1.5 flex items-center", isUser ? "text-indigo-200" : "text-slate-500")}>
            <Clock size={12} className="mr-1" />
            {timestamp}
          </div>
        )}
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-300 text-slate-700 flex items-center justify-center">
          <User size={18} />
        </div>
      )}
    </div>
  )
}

export default MessageBubble
