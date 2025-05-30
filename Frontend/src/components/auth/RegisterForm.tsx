"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuthStore } from "@/stores/authStore"
import { useNavigate, Link } from "react-router-dom"
import type { RegisterCredentials } from "@/types" // Usaremos RegisterCredentials para el envío
import { UserPlus, Mail, Lock, UserIcon } from "lucide-react"

// El tipo para el formulario incluirá confirmPassword
type RegisterFormSchemaType = RegisterCredentials & {
  confirmPassword: string
}

const registerSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

const RegisterForm = () => {
  const { register: registerUser, isLoading, error: authError } = useAuthStore()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchemaType>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterFormSchemaType) => {
    // Ahora, necesitamos asegurarnos de que el tipo que enviamos a registerUser
    // coincida con lo que espera el backend (RegisterRequest.java).
    // Si RegisterCredentials en src/types/index.ts NO incluye confirmPassword,
    // pero tu backend SÍ lo espera, necesitamos ajustar RegisterCredentials
    // o enviar 'data' directamente si authService.register puede manejarlo.

    // Asumiendo que authService.register espera un objeto que coincida con RegisterRequest.java
    // y que RegisterCredentials SÍ debe incluir confirmPassword para el backend.
    // Si RegisterCredentials NO debe tener confirmPassword, entonces la llamada a registerUser
    // debería ser con un objeto que SÍ lo tenga.

    // Vamos a modificar RegisterCredentials para que incluya confirmPassword
    // y luego enviar 'data' directamente.
    try {
      // 'data' ya tiene la forma de RegisterFormSchemaType, que incluye confirmPassword.
      // Si tu authService.register espera un objeto con confirmPassword, esto está bien.
      // Si tu authService.register espera RegisterCredentials (que podría no tener confirmPassword),
      // entonces necesitas asegurar que el tipo enviado sea el correcto.
      // Por ahora, asumiremos que el backend espera todos los campos de RegisterRequest.java
      await registerUser(data) // Enviamos el objeto 'data' completo
      alert("Registration successful! Please login.")
      navigate("/login")
    } catch (err) {
      console.error("Registration failed:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          First Name
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="firstName"
            type="text"
            {...register("firstName")}
            className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2.5"
            placeholder="John"
          />
        </div>
        {errors.firstName && <p className="mt-2 text-sm text-red-600">{errors.firstName.message}</p>}
      </div>

      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Last Name
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <UserIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="lastName"
            type="text"
            {...register("lastName")}
            className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2.5"
            placeholder="Doe"
          />
        </div>
        {errors.lastName && <p className="mt-2 text-sm text-red-600">{errors.lastName.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2.5"
            placeholder="you@example.com"
          />
        </div>
        {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="password"
            type="password"
            {...register("password")}
            className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2.5"
            placeholder="••••••••"
          />
        </div>
        {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <div className="mt-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword")}
            className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md p-2.5"
            placeholder="••••••••"
          />
        </div>
        {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword.message}</p>}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link to="/login" className="font-medium text-primary hover:text-primary/80">
            Already have an account? Login
          </Link>
        </div>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
        >
          {isLoading ? (
            "Registering..."
          ) : (
            <>
              <UserPlus size={18} className="mr-2" /> Register
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default RegisterForm
