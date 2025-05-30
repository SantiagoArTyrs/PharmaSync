import { create } from "zustand"
import { Queue, type IQueue } from "@/utils/dataStructures/Queue" // Assuming Queue is in utils

export interface ToastMessage {
  id: string
  message: string
  type: "success" | "error" | "info" | "warning"
  duration?: number // in ms
}

interface ToastQueueState {
  toastQueue: IQueue<ToastMessage>
  addToast: (toast: Omit<ToastMessage, "id">) => void
  removeToast: (id: string) => void // Not directly used by dequeue, but useful for manual removal
  processToast: () => ToastMessage | undefined // Dequeues and returns a toast
  getToasts: () => ToastMessage[] // For rendering
}

export const useToastQueueStore = create<ToastQueueState>((set, get) => ({
  toastQueue: new Queue<ToastMessage>(),
  addToast: (toast) => {
    const newToast = { ...toast, id: Date.now().toString() + Math.random().toString(36).substr(2, 9) }
    set((state) => {
      const newQueue = new Queue<ToastMessage>()
      state.toastQueue.toArray().forEach((item) => newQueue.enqueue(item))
      newQueue.enqueue(newToast)
      return { toastQueue: newQueue }
    })
  },
  removeToast: (id) => {
    // This is for manual removal, not standard queue operation for display
    set((state) => {
      const newQueue = new Queue<ToastMessage>()
      state.toastQueue
        .toArray()
        .filter((t) => t.id !== id)
        .forEach((item) => newQueue.enqueue(item))
      return { toastQueue: newQueue }
    })
  },
  processToast: () => {
    // Dequeues a toast
    let dequeuedToast: ToastMessage | undefined
    set((state) => {
      const newQueue = new Queue<ToastMessage>()
      const currentToasts = state.toastQueue.toArray()
      dequeuedToast = currentToasts.shift() // Dequeue
      currentToasts.forEach((item) => newQueue.enqueue(item)) // Rebuild queue
      return { toastQueue: newQueue }
    })
    return dequeuedToast
  },
  getToasts: () => {
    // Returns current toasts without dequeuing, for display purposes
    return get().toastQueue.toArray()
  },
}))

// Helper hook for easy toast additions
export const useToasts = () => {
  const addToast = useToastQueueStore((state) => state.addToast)
  return {
    showToast: (message: string, type: ToastMessage["type"] = "info", duration?: number) => {
      addToast({ message, type, duration })
    },
  }
}
