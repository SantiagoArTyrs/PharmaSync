"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useToastQueueStore, type ToastMessage } from "@/stores/toastQueueStore"
import { XCircle, CheckCircle, Info, AlertTriangle } from "lucide-react"

const Toast: React.FC<{ toast: ToastMessage; onDismiss: () => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss()
    }, toast.duration || 5000)
    return () => clearTimeout(timer)
  }, [toast, onDismiss])

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="text-green-500" />
      case "error":
        return <XCircle className="text-red-500" />
      case "warning":
        return <AlertTriangle className="text-yellow-500" />
      case "info":
      default:
        return <Info className="text-blue-500" />
    }
  }

  const getColors = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-100 border-green-500 text-green-700"
      case "error":
        return "bg-red-100 border-red-500 text-red-700"
      case "warning":
        return "bg-yellow-100 border-yellow-500 text-yellow-700"
      case "info":
      default:
        return "bg-blue-100 border-blue-500 text-blue-700"
    }
  }

  return (
    <div
      className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden p-4 mb-2 border-l-4 ${getColors()}`}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3 w-0 flex-1 pt-0.5">
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
        <div className="ml-4 flex-shrink-0 flex">
          <button
            onClick={onDismiss}
            className="inline-flex rounded-md text-current opacity-70 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <span className="sr-only">Close</span>
            <XCircle className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}

const ToastContainer = () => {
  // This component will manage displaying toasts from the queue.
  // For simplicity, we'll display one toast at a time from the queue.
  // A more robust system might display multiple toasts that animate in/out.

  const [activeToasts, setActiveToasts] = useState<ToastMessage[]>([])
  const { toastQueue, processToast } = useToastQueueStore()

  useEffect(() => {
    // Check queue periodically or on change
    const interval = setInterval(() => {
      if (!toastQueue.isEmpty() && activeToasts.length < 3) {
        // Display up to 3 toasts
        const nextToast = processToast() // Dequeues
        if (nextToast) {
          setActiveToasts((prev) => [...prev, nextToast])
        }
      }
    }, 500) // Check queue every 0.5s

    return () => clearInterval(interval)
  }, [toastQueue, processToast, activeToasts.length])

  const handleDismiss = (id: string) => {
    setActiveToasts((prev) => prev.filter((t) => t.id !== id))
  }

  if (activeToasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-2">
      {activeToasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onDismiss={() => handleDismiss(toast.id)} />
      ))}
    </div>
  )
}

export default ToastContainer
