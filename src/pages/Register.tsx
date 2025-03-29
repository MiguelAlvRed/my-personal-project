import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { handleSignUp } from '../lib/auth'
import Logo from '../components/Auth/Logo'
import { Mail, Lock, User } from 'lucide-react'
import AuthForm from '../components/Auth/AuthForm'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const navigate = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    const { success, error } = await handleSignUp(email, password, name)

    if (success) {
      setSuccess(`Registration successful! Please check your email (${email}) to confirm your account.`)
      setEmail('')
      setPassword('')
      setName('')
    } else {
      setError(error)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-1 bg-brand-primary"></div>
          
          <div className="p-8">
            <Logo />
            
            {error && (
              <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-lg text-sm">
                {success}
              </div>
            )}

            <AuthForm
              type="register"
              email={email}
              password={password}
              name={name}
              loading={loading}
              onEmailChange={setEmail}
              onPasswordChange={setPassword}
              onNameChange={setName}
              onSubmit={onSubmit}
            />

            <div className="mt-6 text-center text-sm text-gray-600">
              Already have an account?{' '}
              <a 
                href="/login" 
                className="text-brand-primary font-medium hover:underline"
              >
                Sign in here
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
