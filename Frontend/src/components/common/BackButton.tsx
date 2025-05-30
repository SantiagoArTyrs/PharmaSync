"use client"

import { useNavigate } from "react-router-dom"
import { useNavigationStackStore } from "@/stores/navigationStackStore"
import { ArrowLeft } from "lucide-react"

const BackButton = () => {
  const navigate = useNavigate()
  const { popPage, canGoBack, historyStack } = useNavigationStackStore()

  const handleBack = () => {
    // The stack currently holds: [..., previousPage, currentPage]
    // We want to go to previousPage.
    const stackArray = historyStack.toArray()
    if (stackArray.length > 1) {
      const targetPath = stackArray[stackArray.length - 2] // The one before the last
      navigate(targetPath)
    } else {
      navigate("/") // Fallback to home if no meaningful back history in our stack
    }
  }

  // Disable if we can't go back meaningfully
  if (!canGoBack() || historyStack.size() <= 1) {
    return null // Or a disabled button: <button disabled>Back</button>
  }

  return (
    <button
      onClick={handleBack}
      className="flex items-center px-3 py-1.5 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
    >
      <ArrowLeft size={16} className="mr-1.5" />
      Back
    </button>
  )
}

export default BackButton
