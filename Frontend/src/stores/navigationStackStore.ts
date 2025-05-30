import { create } from "zustand"
import { Stack } from "@/utils/dataStructures/Stack"

interface NavigationStackState {
  historyStack: Stack<string>
  pushPage: (pathname: string) => void
  popPage: () => string | undefined // Returns the path to navigate to
  canGoBack: () => boolean
}

export const useNavigationStackStore = create<NavigationStackState>((set, get) => ({
  historyStack: new Stack<string>(),
  pushPage: (pathname: string) => {
    // Avoid pushing the same path consecutively if already at the top
    if (get().historyStack.peek() !== pathname) {
      set((state) => {
        const newStack = new Stack<string>()
        state.historyStack.toArray().forEach((item) => newStack.push(item)) // Clone stack
        newStack.push(pathname)
        return { historyStack: newStack }
      })
    }
  },
  popPage: () => {
    let previousPage: string | undefined
    set((state) => {
      const newStack = new Stack<string>()
      state.historyStack.toArray().forEach((item) => newStack.push(item)) // Clone stack

      newStack.pop() // Pop current page
      previousPage = newStack.peek() // This is the page to navigate to

      // We don't actually modify the stack here for popPage's return,
      // because pushPage on navigation will handle the new "current".
      // The actual pop for navigation happens when navigate() is called and App.tsx useEffect runs.
      // This logic might need refinement based on exact UX desired.
      // A simpler popPage would just pop and return.
      // For this example, let's make it simpler: pop and return the new top.
      // The `App.tsx` `useEffect` will push the new current page.
      return { historyStack: state.historyStack } // No change here, actual pop is conceptual for navigation
    })
    // A more direct popPage for navigation:
    const currentStack = get().historyStack
    if (currentStack.size() > 1) {
      const current = currentStack.pop() // remove current
      const target = currentStack.peek() // target is new top
      if (current) currentStack.push(current) // temporarily push back current, App.tsx will handle it
      return target
    }
    return undefined // Cannot go back further
  },
  canGoBack: () => {
    return get().historyStack.size() > 1 // Can go back if more than just the current page is on stack
  },
}))
