import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { LogOut } from 'lucide-react'

export default function Header() {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-brand-primary">hambre</span>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center text-gray-600 hover:text-brand-primary transition-colors"
          >
            <LogOut className="h-5 w-5 mr-1" />
            Sign Out
          </button>
        </div>
      </div>
    </header>
  )
}
