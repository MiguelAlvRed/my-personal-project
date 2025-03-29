import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import PreferencesOnboarding from '../components/Onboarding/PreferencesOnboarding'

export default function OnboardingPage() {
  const navigate = useNavigate()

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) {
          navigate('/login')
          return
        }

        const { data: preferences } = await supabase
          .from('user_preferences')
          .select('onboarding_complete')
          .eq('user_id', user.id)
          .single()

        if (preferences?.onboarding_complete) {
          navigate('/')
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error)
        navigate('/login')
      }
    }

    checkOnboardingStatus()
  }, [navigate])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <PreferencesOnboarding />
    </div>
  )
}
