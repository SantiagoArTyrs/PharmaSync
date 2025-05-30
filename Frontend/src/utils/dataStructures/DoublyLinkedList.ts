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
  // Implement other DLL methods
}
