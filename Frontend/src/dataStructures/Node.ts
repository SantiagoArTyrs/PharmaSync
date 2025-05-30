// Basic Node for Singly Linked List
export class SLLNode<T> {
  public value: T
  public next: SLLNode<T> | null

  constructor(value: T) {
    this.value = value
    this.next = null
  }
}

// Node for Doubly Linked List
export class DLLNode<T> {
  public value: T
  public next: DLLNode<T> | null
  public prev: DLLNode<T> | null

  constructor(value: T) {
    this.value = value
    this.next = null
    this.prev = null
  }
}

// Node for Tree
export class TreeNode<T> {
  public id: string // For React keys and easier identification
  public value: T
  public children: TreeNode<T>[]

  constructor(id: string, value: T) {
    this.id = id
    this.value = value
    this.children = []
  }

  addChild(node: TreeNode<T>): void {
    this.children.push(node)
  }
}
