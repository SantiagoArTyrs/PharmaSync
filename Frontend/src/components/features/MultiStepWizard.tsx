"use client"

import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useStepNavigator } from "@/hooks/useStepNavigator"

interface WizardStep {
  id: string
  title: string
  description: string
  component: React.ReactNode
  isValid?: boolean
}

interface MultiStepWizardProps {
  steps: WizardStep[]
  onComplete?: (data: any) => void
  onCancel?: () => void
}

export const MultiStepWizard: React.FC<MultiStepWizardProps> = ({ steps, onComplete, onCancel }) => {
  const { currentStep, currentIndex, hasNext, hasPrevious, stepCount, nextStep, previousStep, goToStep } =
    useStepNavigator<WizardStep>(steps)

  const progress = ((currentIndex + 1) / stepCount) * 100

  const handleNext = () => {
    if (hasNext) {
      nextStep()
    } else if (currentStep) {
      // Last step - complete wizard
      onComplete?.(currentStep)
    }
  }

  const canProceed = currentStep?.isValid !== false

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{currentStep?.title || "Multi-Step Wizard"}</span>
          <span className="text-sm font-normal text-muted-foreground">
            Step {currentIndex + 1} of {stepCount}
          </span>
        </CardTitle>
        <Progress value={progress} className="w-full" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Step indicators */}
        <div className="flex justify-center space-x-2">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => goToStep(index)}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                index < currentIndex
                  ? "bg-green-500 text-white"
                  : index === currentIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
              disabled={index > currentIndex}
            >
              {index < currentIndex ? <Check className="h-4 w-4" /> : index + 1}
            </button>
          ))}
        </div>

        {/* Current step content */}
        <div className="min-h-[300px]">
          {currentStep && (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold">{currentStep.title}</h3>
                <p className="text-muted-foreground">{currentStep.description}</p>
              </div>
              <div>{currentStep.component}</div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <div className="flex space-x-2">
            <Button variant="outline" onClick={previousStep} disabled={!hasPrevious}>
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={handleNext} disabled={!canProceed}>
              {hasNext ? (
                <>
                  Next
                  <ChevronRight className="h-4 w-4 ml-2" />
                </>
              ) : (
                "Complete"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
