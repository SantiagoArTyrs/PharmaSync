// Generic Queue implementation
export interface IQueue<T> {
  enqueue(item: T): void
  dequeue(): T | undefined
  peek(): T | undefined
  isEmpty(): boolean
  size(): number
  toArray(): T[]
}

export class Queue<T> implements IQueue<T> {
  private items: T[] = []

  enqueue(item: T): void {
    this.items.push(item)
  }

  dequeue(): T | undefined {
    return this.items.shift()
  }

  peek(): T | undefined {
    return this.items[0]
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length
  }

  toArray(): T[] {
    return [...this.items]
  }

  // Enhanced methods
  clear(): void {
    this.items = []
  }

  contains(item: T): boolean {
    return this.items.includes(item)
  }

  // Process all items with a callback
  processAll(callback: (item: T) => void): void {
    while (!this.isEmpty()) {
      const item = this.dequeue()
      if (item) callback(item)
    }
  }
}

// Specialized PriorityQueue for notifications
export class PriorityQueue<T> {
  private items: Array<{ item: T; priority: number }> = []

  enqueue(item: T, priority = 0): void {
    const newItem = { item, priority }
    let added = false

    for (let i = 0; i < this.items.length; i++) {
      if (newItem.priority > this.items[i].priority) {
        this.items.splice(i, 0, newItem)
        added = true
        break
      }
    }

    if (!added) {
      this.items.push(newItem)
    }
  }

  dequeue(): T | undefined {
    const item = this.items.shift()
    return item?.item
  }

  peek(): T | undefined {
    return this.items[0]?.item
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  size(): number {
    return this.items.length
  }

  clear(): void {
    this.items = []
  }
}

// Offline message queue with retry logic
export class OfflineMessageQueue<T> extends Queue<T> {
  private retryCount = new Map<T, number>()
  private maxRetries: number

  constructor(maxRetries = 3) {
    super()
    this.maxRetries = maxRetries
  }

  enqueueWithRetry(item: T): void {
    this.enqueue(item)
    this.retryCount.set(item, 0)
  }

  dequeueWithRetry(): T | undefined {
    const item = this.dequeue()
    if (item) {
      const currentRetries = this.retryCount.get(item) || 0
      if (currentRetries < this.maxRetries) {
        this.retryCount.set(item, currentRetries + 1)
        return item
      } else {
        this.retryCount.delete(item)
        return item
      }
    }
    return undefined
  }

  requeueFailed(item: T): boolean {
    const currentRetries = this.retryCount.get(item) || 0
    if (currentRetries < this.maxRetries) {
      this.enqueue(item)
      return true
    }
    this.retryCount.delete(item)
    return false
  }

  getRetryCount(item: T): number {
    return this.retryCount.get(item) || 0
  }
}
