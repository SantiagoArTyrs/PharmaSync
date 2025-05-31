"use client"

import { useState, useCallback } from "react"
import { UndoRedoStack } from "@/dataStructures/Stack"

interface UseUndoRedoOptions<T> {
  maxSize?: number
  initialState: T
}

export function useUndoRedo<T>({ maxSize = 50, initialState }: UseUndoRedoOptions<T>) {
  const [state, setState] = useState<T>(initialState)
  const [undoRedoStack] = useState(() => new UndoRedoStack<T>(maxSize))

  const execute = useCallback(
    (newState: T) => {
      undoRedoStack.execute(state)
      setState(newState)
    },
    [state, undoRedoStack],
  )

  const undo = useCallback(() => {
    const previousState = undoRedoStack.undo()
    if (previousState !== undefined) {
      setState(previousState)
    }
  }, [undoRedoStack])

  const redo = useCallback(() => {
    const nextState = undoRedoStack.redo()
    if (nextState !== undefined) {
      setState(nextState)
    }
  }, [undoRedoStack])

  const canUndo = undoRedoStack.canUndo()
  const canRedo = undoRedoStack.canRedo()

  const clear = useCallback(() => {
    undoRedoStack.clear()
    setState(initialState)
  }, [undoRedoStack, initialState])

  return {
    state,
    execute,
    undo,
    redo,
    canUndo,
    canRedo,
    clear,
  }
}
