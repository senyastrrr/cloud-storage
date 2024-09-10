import LoginForm from '@/components/auth/login-form'
import Guest from '@/layouts/GuestLayout'

const LoginPage = () => {
  return (
    <Guest>
      <div className="h-screen flex flex-col justify-center">
        <LoginForm />
      </div>
    </Guest>
  )
}

export default LoginPage