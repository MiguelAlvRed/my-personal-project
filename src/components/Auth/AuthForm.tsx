import { Mail, Lock, User } from 'lucide-react'

interface AuthFormProps {
  type: 'login' | 'register'
  email: string
  password: string
  name?: string
  loading: boolean
  onEmailChange: (value: string) => void
  onPasswordChange: (value: string) => void
  onNameChange?: (value: string) => void
  onSubmit: (e: React.FormEvent) => void
}

export default function AuthForm({
  type,
  email,
  password,
  name = '',
  loading,
  onEmailChange,
  onPasswordChange,
  onNameChange,
  onSubmit
}: AuthFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {type === 'register' && (
        <div className="space-y-1">
          <label className="block text-sm text-gray-600">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => onNameChange?.(e.target.value)}
              className="pl-10 w-full py-2 border-b border-gray-300 focus:border-brand-primary focus:outline-none"
              placeholder="Your name"
              required
            />
          </div>
        </div>
      )}

      <div className="space-y-1">
        <label className="block text-sm text-gray-600">Email</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            className="pl-10 w-full py-2 border-b border-gray-300 focus:border-brand-primary focus:outline-none"
            placeholder="your@email.com"
            required
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="block text-sm text-gray-600">Password</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
            className="pl-10 w-full py-2 border-b border-gray-300 focus:border-brand-primary focus:outline-none"
            placeholder="••••••••"
            required
            minLength={6}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-2.5 px-4 rounded-lg text-white font-medium bg-brand-primary hover:bg-opacity-90 transition ${
          loading ? 'opacity-80' : ''
        }`}
      >
        {loading ? (
          <span className="inline-flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Processing...
          </span>
        ) : type === 'login' ? 'Log In' : 'Sign Up'}
      </button>
    </form>
  )
}
