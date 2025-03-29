import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export function useOnboardingStatus() {
  const [requiresOnboarding, setRequiresOnboarding] = useState<boolean | null>(null)

  useEffect(() => {
    const checkOnboarding = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        setRequiresOnboarding(null)
        return
      }

      const { data: preferences } = await supabase
        .from('user_preferences')
        .select('onboarding_complete')
        .eq('user_id', user.id)
        .single()

      setRequiresOnboarding(!preferences?.onboarding_complete)
    }

    checkOnboarding()

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkOnboarding()
    })

    return () => subscription.unsubscribe()
  }, [])

  return requiresOnboarding
}
