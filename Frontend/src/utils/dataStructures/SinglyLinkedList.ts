import { SLLNode } from "./Node"

export interface ISinglyLinkedList<T> {
  head: SLLNode<T> | null
  tail: SLLNode<T> | null
  length: number
  append(value: T): void
  prepend(value: T): void
  toArray(): T[]
  // Add other methods like insertAt, removeAt, find, etc. as needed
}

export class SinglyLinkedList<T> implements ISinglyLinkedList<T> {
  public head: SLLNode<T> | null = null
  public tail: SLLNode<T> | null = null
  public length = 0

  append(value: T): void {
    const newNode = new SLLNode(value)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail!.next = newNode
      this.tail = newNode
    }
    this.length++
  }

  prepend(value: T): void {
    const newNode = new SLLNode(value)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.next = this.head
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

  // Implement other SLL methods as needed
}
