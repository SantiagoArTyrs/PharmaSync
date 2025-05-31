import { DLLNode } from "./Node" // Reusing DLLNode for simplicity

export interface IDoublyCircularLinkedList<T> {
  head: DLLNode<T> | null
  length: number
  append(value: T): void
  toArray(): T[]
  // Add other methods like remove, find, etc.
}

export class DoublyCircularLinkedList<T> implements IDoublyCircularLinkedList<T> {
  public head: DLLNode<T> | null = null
  public length = 0

  append(value: T): void {
    const newNode = new DLLNode(value)
    if (!this.head) {
      this.head = newNode
      newNode.next = newNode // Points to itself
      newNode.prev = newNode // Points to itself
    } else {
      const tail = this.head.prev! // In a DCLL, head.prev is the tail
      tail.next = newNode
      newNode.prev = tail
      newNode.next = this.head
      this.head.prev = newNode
    }
    this.length++
  }

  prepend(value: T): void {
    const newNode = new DLLNode(value)
    if (!this.head) {
      this.head = newNode
      newNode.next = newNode
      newNode.prev = newNode
    } else {
      const tail = this.head.prev!
      newNode.next = this.head
      newNode.prev = tail
      tail.next = newNode
      this.head.prev = newNode
      this.head = newNode
    }
    this.length++
  }

  toArray(): T[] {
    if (!this.head) return []
    const result: T[] = []
    let currentNode = this.head
    do {
      result.push(currentNode.value)
      currentNode = currentNode.next!
    } while (currentNode !== this.head)
    return result
  }

  // Enhanced circular navigation methods
  findNode(value: T): DLLNode<T> | null {
    if (!this.head) return null

    let currentNode = this.head
    do {
      if (currentNode.value === value) return currentNode
      currentNode = currentNode.next!
    } while (currentNode !== this.head)
    return null
  }

  remove(value: T): boolean {
    const nodeToRemove = this.findNode(value)
    if (!nodeToRemove) return false

    if (this.length === 1) {
      this.head = null
    } else {
      nodeToRemove.prev!.next = nodeToRemove.next
      nodeToRemove.next!.prev = nodeToRemove.prev

      if (nodeToRemove === this.head) {
        this.head = nodeToRemove.next
      }
    }

    this.length--
    return true
  }

  clear(): void {
    this.head = null
    this.length = 0
  }

  isEmpty(): boolean {
    return this.length === 0
  }
  // Implement other DCLL methods
}

// Specialized Carousel for UI components
export class Carousel<T> {
  private list = new DoublyCircularLinkedList<T>()
  private currentNode: DLLNode<T> | null = null

  addItem(item: T): void {
    this.list.append(item)
    if (!this.currentNode) {
      this.currentNode = this.list.head
    }
  }

  getCurrentItem(): T | null {
    return this.currentNode?.value || null
  }

  next(): T | null {
    if (this.currentNode) {
      this.currentNode = this.currentNode.next!
      return this.currentNode.value
    }
    return null
  }

  previous(): T | null {
    if (this.currentNode) {
      this.currentNode = this.currentNode.prev!
      return this.currentNode.value
    }
    return null
  }

  goTo(item: T): boolean {
    const node = this.list.findNode(item)
    if (node) {
      this.currentNode = node
      return true
    }
    return false
  }

  getAllItems(): T[] {
    return this.list.toArray()
  }

  getItemCount(): number {
    return this.list.length
  }

  getCurrentIndex(): number {
    if (!this.currentNode || !this.list.head) return -1

    let index = 0
    let node = this.list.head
    do {
      if (node === this.currentNode) return index
      node = node.next!
      index++
    } while (node !== this.list.head)

    return -1
  }

  isEmpty(): boolean {
    return this.list.isEmpty()
  }

  clear(): void {
    this.list.clear()
    this.currentNode = null
  }

  // Auto-advance functionality for slideshow
  autoAdvance(intervalMs: number, callback?: (item: T) => void): () => void {
    const interval = setInterval(() => {
      const nextItem = this.next()
      if (nextItem && callback) {
        callback(nextItem)
      }
    }, intervalMs)

    return () => clearInterval(interval)
  }
}

// Tab Carousel for circular tab navigation
export class TabCarousel<T> extends Carousel<T> {
  private onTabChange?: (tab: T, index: number) => void

  constructor(onTabChange?: (tab: T, index: number) => void) {
    super()
    this.onTabChange = onTabChange
  }

  next(): T | null {
    const nextTab = super.next()
    if (nextTab && this.onTabChange) {
      this.onTabChange(nextTab, this.getCurrentIndex())
    }
    return nextTab
  }

  previous(): T | null {
    const prevTab = super.previous()
    if (prevTab && this.onTabChange) {
      this.onTabChange(prevTab, this.getCurrentIndex())
    }
    return prevTab
  }

  goTo(item: T): boolean {
    const success = super.goTo(item)
    if (success && this.onTabChange) {
      this.onTabChange(item, this.getCurrentIndex())
    }
    return success
  }
}
