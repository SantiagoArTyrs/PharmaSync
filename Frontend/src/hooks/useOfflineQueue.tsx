// src/hooks/useOfflineQueue.ts
import { useState, useEffect, useCallback } from "react"
import { OfflineMessageQueue } from "@/dataStructures/Queue"

interface UseOfflineQueueOptions<T> {
  maxRetries?: number
  processItem: (item: T) => Promise<boolean>
  onSuccess?: (item: T) => void
  onFailure?: (item: T, retries: number) => void
}

export function useOfflineQueue<T>({
  maxRetries = 3,
  processItem,
  onSuccess,
  onFailure,
}: UseOfflineQueueOptions<T>) {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [queue] = useState(() => new OfflineMessageQueue<T>(maxRetries))
  const [isProcessing, setIsProcessing] = useState(false)
  const [queueSize, setQueueSize] = useState(0)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  useEffect(() => {
    if (isOnline && !queue.isEmpty() && !isProcessing) {
      processQueue()
    }
  }, [isOnline, queueSize])

  const processQueue = useCallback(async () => {
    if (isProcessing) return
    setIsProcessing(true)

    while (!queue.isEmpty() && isOnline) {
      const item = queue.dequeueWithRetry()
      if (!item) break
      try {
        const success = await processItem(item)
        if (success) {
          onSuccess?.(item)
        } else {
          const requeued = queue.requeueFailed(item)
          if (!requeued) {
            onFailure?.(item, queue.getRetryCount(item))
          }
        }
      } catch {
        const requeued = queue.requeueFailed(item)
        if (!requeued) {
          onFailure?.(item, queue.getRetryCount(item))
        }
      }
      setQueueSize(queue.size())
    }
    setIsProcessing(false)
  }, [queue, processItem, onSuccess, onFailure, isOnline, isProcessing])

  const enqueue = useCallback(
    (item: T) => {
      if (isOnline) {
        processItem(item)
          .then(success => {
            if (success) {
              onSuccess?.(item)
            } else {
              queue.enqueueWithRetry(item)
              setQueueSize(queue.size())
            }
          })
          .catch(() => {
            queue.enqueueWithRetry(item)
            setQueueSize(queue.size())
          })
      } else {
        queue.enqueueWithRetry(item)
        setQueueSize(queue.size())
      }
    },
    [isOnline, processItem, onSuccess, queue]
  )

  return {
    enqueue,
    isOnline,
    queueSize,
    isProcessing,
    forceProcess: processQueue,
  }
}
