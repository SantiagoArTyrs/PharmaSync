import RegisterForm from "@/components/auth/RegisterForm"

const RegisterPage = () => {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-xl rounded-lg border border-border">
        <h2 className="text-3xl font-bold text-center text-primary">Create your PharmaSync Account</h2>
        <RegisterForm />
      </div>
    </div>
  )
}

export default RegisterPage
