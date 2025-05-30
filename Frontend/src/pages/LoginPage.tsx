import LoginForm from "@/components/auth/LoginForm"

const LoginPage = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-xl rounded-lg border border-border">
        <h2 className="text-3xl font-bold text-center text-primary">Login to PharmaSync</h2>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
