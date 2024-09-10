import RegisterForm from "@/components/auth/register-form"
import Guest from "@/layouts/GuestLayout"

const RegisterPage = () => {
  return (
    <Guest>
      <div className="h-screen flex flex-col justify-center">
        <RegisterForm />
      </div>
    </Guest>
  )
}

export default RegisterPage