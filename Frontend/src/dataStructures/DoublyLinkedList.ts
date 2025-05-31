import { DLLNode } from "./Node"

export interface IDoublyLinkedList<T> {
  head: DLLNode<T> | null
  tail: DLLNode<T> | null
  length: number
  append(value: T): void
  prepend(value: T): void
  toArray(): T[]
  findNode(value: T): DLLNode<T> | null // Example method
  // Add other methods like insertAt, remove, etc.
}

export class DoublyLinkedList<T> implements IDoublyLinkedList<T> {
  public head: DLLNode<T> | null = null
  public tail: DLLNode<T> | null = null
  public length = 0

  append(value: T): void {
    const newNode = new DLLNode(value)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail!.next = newNode
      newNode.prev = this.tail
      this.tail = newNode
    }
    this.length++
  }

  prepend(value: T): void {
    const newNode = new DLLNode(value)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
      this.head!.prev = newNode
      this.head = newNode
    }
    this.length++
  }

  toArray(): T[] {
    const result: T[] = []
    let currentNode = this.head
    while (currentNode) {
      result.push(currentNode.value)
      currentNode = currentNode.next
    }
    return result
  }

  findNode(value: T): DLLNode<T> | null {
    let currentNode = this.head
    while (currentNode) {
      if (currentNode.value === value) return currentNode
      currentNode = currentNode.next
    }
    return null
  }

  public findNodeBy(predicate: (node: DLLNode<T>) => boolean): DLLNode<T> | null {
    let currentNode = this.head
    while (currentNode) {
      if (predicate(currentNode)) return currentNode
      currentNode = currentNode.next
    }
    return null
  }

  // Enhanced navigation methods
  insertAt(index: number, value: T): boolean {
    if (index < 0 || index > this.length) return false

    if (index === 0) {
      this.prepend(value)
      return true
    }

    if (index === this.length) {
      this.append(value)
      return true
    }

    const newNode = new DLLNode(value)
    let current = this.head
    for (let i = 0; i < index; i++) {
      current = current!.next
    }

    newNode.next = current
    newNode.prev = current!.prev
    current!.prev!.next = newNode
    current!.prev = newNode
    this.length++
    return true
  }

  removeAt(index: number): T | null {
    if (index < 0 || index >= this.length) return null

    let nodeToRemove: DLLNode<T>

    if (index === 0) {
      nodeToRemove = this.head!
      this.head = this.head!.next
      if (this.head) {
        this.head.prev = null
      } else {
        this.tail = null
      }
    } else if (index === this.length - 1) {
      nodeToRemove = this.tail!
      this.tail = this.tail!.prev
      if (this.tail) {
        this.tail.next = null
      } else {
        this.head = null
      }
    } else {
      let current = this.head
      for (let i = 0; i < index; i++) {
        current = current!.next
      }
      nodeToRemove = current!
      current!.prev!.next = current!.next
      current!.next!.prev = current!.prev
    }

    this.length--
    return nodeToRemove.value
  }

  get(index: number): T | null {
    if (index < 0 || index >= this.length) return null

    let current: DLLNode<T>

    // Optimize by starting from head or tail based on index
    if (index <= this.length / 2) {
      current = this.head!
      for (let i = 0; i < index; i++) {
        current = current.next!
      }
    } else {
      current = this.tail!
      for (let i = this.length - 1; i > index; i--) {
        current = current.prev!
      }
    }

    return current.value
  }

  clear(): void {
    this.head = null
    this.tail = null
    this.length = 0
  }
  // Implement other DLL methods
}

// Specialized Navigator for step-by-step navigation
export class StepNavigator<T> {
  private list = new DoublyLinkedList<T>()
  private currentNode: DLLNode<T> | null = null

  addStep(step: T): void {
    this.list.append(step)
    if (!this.currentNode) {
      this.currentNode = this.list.head
    }
  }

  getCurrentStep(): T | null {
    return this.currentNode?.value || null
  }

  nextStep(): T | null {
    if (this.currentNode?.next) {
      this.currentNode = this.currentNode.next
      return this.currentNode.value
    }
    return null
  }

  previousStep(): T | null {
    if (this.currentNode?.prev) {
      this.currentNode = this.currentNode.prev
      return this.currentNode.value
    }
    return null
  }

  hasNext(): boolean {
    return this.currentNode?.next !== null
  }

  hasPrevious(): boolean {
    return this.currentNode?.prev !== null
  }

  goToStep(index: number): T | null {
    let target = this.list.head
    for (let i = 0; i < index && target; i++) {
      target = target.next
    }
    if (target) {
      this.currentNode = target
      return target.value
    }
    return null
  }

  getCurrentIndex(): number {
    if (!this.currentNode) return -1

    let index = 0
    let node = this.list.head
    while (node && node !== this.currentNode) {
      node = node.next
      index++
    }
    return node === this.currentNode ? index : -1
  }

  getAllSteps(): T[] {
    return this.list.toArray()
  }

  getStepCount(): number {
    return this.list.length
  }

  reset(): void {
    this.currentNode = this.list.head
  }

  clear(): void {
    this.list.clear()
    this.currentNode = null
  }
}
