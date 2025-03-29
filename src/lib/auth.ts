import { supabase } from './supabase'

export const handleLogin = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        throw new Error('Please confirm your email first. Check your inbox.')
      }
      throw error
    }

    if (!data.session) {
      throw new Error('Login failed. Please try again.')
    }

    // Check onboarding status after successful login
    const { data: preferences } = await supabase
      .from('user_preferences')
      .select('onboarding_complete')
      .eq('user_id', data.user.id)
      .single()

    return { 
      success: true,
      requiresOnboarding: !preferences?.onboarding_complete
    }
  } catch (error: any) {
    return { 
      success: false, 
      error: error.message || 'Login failed' 
    }
  }
}

// ... (keep existing signUp and resendConfirmation functions)
