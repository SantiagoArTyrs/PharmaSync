"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuthStore } from "@/stores/authStore"
import { useNavigate, Link } from "react-router-dom"
import type { LoginFormInputs } from "@/types" // LoginFormInputs ahora usa 'email'
import { Mail, Lock, LogIn } from 'lucide-react'

const loginSchema = z.object({
  email: z.string().email("Invalid email address"), // CAMBIADO de emailOrUsername a email y validación de email
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const LoginForm = () => {
  const { login, isLoading, error: authError } = useAuthStore()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      await login(data) // 'data' ahora tendrá 'email' y 'password'
      navigate("/chat") // Or to a dashboard
    } catch (err) {
      // Error is handled by authStore and displayed below
      console.error("Login failed:", err)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {authError && <p className="text-red-500 text-sm text-center">{authError}</p>}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            id="email" // CAMBIADO id y name (implícito por register)
            type="email" // CAMBIADO a type="email"
            {...register("email")} // CAMBIADO a "email"
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
        <div className="mt-1 relative rounded-md shadow-sm">
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

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <Link to="/register" className="font-medium text-primary hover:text-primary/80">
            Don't have an account? Register
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
            "Logging in..."
          ) : (
            <>
              <LogIn size={18} className="mr-2" /> Login
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default LoginForm
