import { useState, useCallback, useEffect } from "react"
import { StepNavigator } from "@/dataStructures/DoublyLinkedList"

export function useStepNavigator<T>(initialSteps: T[] = []) {
  const [navigator] = useState(() => {
    const nav = new StepNavigator<T>()
    initialSteps.forEach(step => nav.addStep(step))
    return nav
  })

  const [currentIndex, setCurrentIndex] = useState(0)
  const [currentStep, setCurrentStep] = useState<T | null>(navigator.getCurrentStep())

  // Cada vez que cambie currentIndex sincronizamos el puntero del navigator y actualizamos currentStep
  useEffect(() => {
    navigator.goToStep(currentIndex)
    setCurrentStep(navigator.getCurrentStep())
  }, [currentIndex, navigator])

  const nextStep = useCallback(() => {
    if (currentIndex < navigator.getStepCount() - 1) {
      setCurrentIndex(prev => prev + 1)
    }
  }, [currentIndex, navigator])

  const previousStep = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1)
    }
  }, [currentIndex])

  const goToStep = useCallback(
    (index: number) => {
      if (index >= 0 && index < navigator.getStepCount()) {
        setCurrentIndex(index)
      }
    },
    [navigator]
  )

  return {
    currentStep,
    currentIndex,
    hasNext: currentIndex < navigator.getStepCount() - 1,
    hasPrevious: currentIndex > 0,
    stepCount: navigator.getStepCount(),
    nextStep,
    previousStep,
    goToStep,
  }
}
