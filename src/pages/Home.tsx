import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) navigate('/login')
    }
    checkSession()
  }, [navigate])

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-medium text-brand-primary mb-4">Bienvenido a hambre</h1>
        <p className="text-gray-700">Descubre los mejores lugares para comer en Madrid</p>
      </div>
    </div>
  )
}
