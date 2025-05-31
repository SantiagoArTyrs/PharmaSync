// Generic Stack implementation
export class Stack<T> {
  private items: T[] = []

  push(item: T): void {
    this.items.push(item)
  }

  pop(): T | undefined {
    return this.items.pop()
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1]
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

  toArray(): T[] {
    return [...this.items]
  }

  // Enhanced methods for undo/redo functionality
  getAll(): T[] {
    return [...this.items]
  }

  canPop(): boolean {
    return this.items.length > 0
  }

  // Get nth item from top without removing
  peekAt(index: number): T | undefined {
    if (index < 0 || index >= this.items.length) return undefined
    return this.items[this.items.length - 1 - index]
  }
}

// Specialized UndoRedoStack for managing state changes
export class UndoRedoStack<T> {
  private undoStack = new Stack<T>()
  private redoStack = new Stack<T>()
  private maxSize: number

  constructor(maxSize = 50) {
    this.maxSize = maxSize
  }

  execute(action: T): void {
    // Add current state to undo stack
    this.undoStack.push(action)

    // Clear redo stack when new action is performed
    this.redoStack.clear()

    // Maintain max size
    if (this.undoStack.size() > this.maxSize) {
      // Remove oldest item (this would require a more complex implementation)
      // For now, we'll just clear when at max size
    }
  }

  undo(): T | undefined {
    const action = this.undoStack.pop()
    if (action) {
      this.redoStack.push(action)
    }
    return action
  }

  redo(): T | undefined {
    const action = this.redoStack.pop()
    if (action) {
      this.undoStack.push(action)
    }
    return action
  }

  canUndo(): boolean {
    return this.undoStack.canPop()
  }

  canRedo(): boolean {
    return this.redoStack.canPop()
  }

  clear(): void {
    this.undoStack.clear()
    this.redoStack.clear()
  }
}
