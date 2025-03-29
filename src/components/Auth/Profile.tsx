import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { User, LogOut } from 'lucide-react'

export default function Profile() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setLoading(false)
    }

    fetchUser()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    window.location.reload()
  }

  if (loading) return <div>Loading...</div>

  if (!user) return <div>Not authenticated</div>

  return (
    <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
      <div className="text-center">
        <div className="mx-auto h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
          <User className="h-12 w-12 text-indigo-600" />
        </div>
        <h2 className="mt-2 text-2xl font-bold text-gray-900">
          {user.user_metadata?.full_name || 'User'}
        </h2>
        <p className="mt-1 text-sm text-gray-600">{user.email}</p>
      </div>

      <div className="mt-6">
        <button
          onClick={handleSignOut}
          className="w-full flex justify-center items-center gap-2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </div>
  )
}
