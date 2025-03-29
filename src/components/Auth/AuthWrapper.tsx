import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import SignIn from './SignIn'
import SignUp from './SignUp'
import Profile from './Profile'

export default function AuthWrapper() {
  const [authView, setAuthView] = useState('signin')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  if (user) {
    return <Profile />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      {authView === 'signin' ? (
        <div className="space-y-4">
          <SignIn />
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => setAuthView('signup')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign up
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <SignUp />
          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => setAuthView('signin')}
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
