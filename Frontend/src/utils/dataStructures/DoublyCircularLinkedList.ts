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
  // Implement other DCLL methods
}
