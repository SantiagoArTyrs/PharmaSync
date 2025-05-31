"use client"

import React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { useStepNavigator } from "@/hooks/useStepNavigator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

interface StepData {
  firstName?: string
  lastName?: string
  email?: string
  password?: string
  confirmPassword?: string
}

const initialSteps = [
  { id: "name", title: "Name", description: "Please enter your first and last name" },
  { id: "email", title: "Email", description: "Enter your email address" },
  { id: "password", title: "Password", description: "Create a password and confirm it" },
]

export const Register: React.FC = () => {
  const [formData, setFormData] = React.useState<StepData>({})
  const [error, setError] = React.useState("")
  const [loading, setLoading] = React.useState(false)

  const { register, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate("/chat", { replace: true })
    }
  }, [isAuthenticated, navigate])

  const { currentStep, hasNext, hasPrevious, nextStep, previousStep } = useStepNavigator(initialSteps)

  const validateStep = (stepId: string, data: StepData) => {
    switch (stepId) {
      case "name":
        return !!data.firstName?.trim() && !!data.lastName?.trim()
      case "email":
        return /^\S+@\S+\.\S+$/.test(data.email || "")
      case "password":
        return !!data.password && data.password.length >= 6 && data.password === data.confirmPassword
      default:
        return false
    }
  }

  const isCurrentStepValid = currentStep ? validateStep(currentStep.id, formData) : false

  const handleChange = (field: keyof StepData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (error) setError("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!isCurrentStepValid) {
      setError("Please fill out the current step correctly.")
      return
    }

    if (currentStep?.id === "password" && formData.password !== formData.confirmPassword) {
      setError("Passwords don't match")
      return
    }

    if (hasNext) {
      nextStep()
    } else {
      try {
        setLoading(true)
        await register({
          firstName: formData.firstName!,
          lastName: formData.lastName!,
          email: formData.email!,
          password: formData.password!,
          confirmPassword: formData.confirmPassword!,
        })
        // Registro exitoso, inicio sesión automático
        navigate("/chat")
      } catch {
        setError("Registration failed. Please try again.")
      } finally {
        setLoading(false)
      }
    }
  }

  const renderStepContent = () => {
    if (!currentStep) return null

    switch (currentStep.id) {
      case "name":
        return (
          <>
            <div>
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName || ""}
                onChange={e => handleChange("firstName", e.target.value)}
                placeholder="John"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName || ""}
                onChange={e => handleChange("lastName", e.target.value)}
                placeholder="Doe"
                required
              />
            </div>
          </>
        )
      case "email":
        return (
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email || ""}
              onChange={e => handleChange("email", e.target.value)}
              placeholder="john@example.com"
              required
            />
          </div>
        )
      case "password":
        return (
          <>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password || ""}
                onChange={e => handleChange("password", e.target.value)}
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword || ""}
                onChange={e => handleChange("confirmPassword", e.target.value)}
                placeholder="Confirm your password"
                required
                minLength={6}
              />
            </div>
          </>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-primary">PharmaSync</CardTitle>
          <CardDescription>Create your medical assistant account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <p className="text-muted-foreground">{currentStep?.description}</p>
            {renderStepContent()}

            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={previousStep} disabled={!hasPrevious || loading}>
                Previous
              </Button>
              <Button type="submit" disabled={!isCurrentStepValid || loading}>
                {hasNext ? "Next" : loading ? "Creating account..." : "Complete"}
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
