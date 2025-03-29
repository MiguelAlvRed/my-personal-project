import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import { Check, ChevronRight, ChevronLeft, Smile, Utensils } from 'lucide-react'

// ... (keep existing constants and component structure)

const savePreferences = async () => {
  setIsSaving(true)
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) throw new Error('User not authenticated')

    const { error } = await supabase
      .from('user_preferences')
      .upsert({
        user_id: user.id,
        diets: selectedDiets,
        allergies: selectedAllergies,
        cuisines: selectedCuisines,
        onboarding_complete: true  // Mark onboarding as complete
      }, {
        onConflict: 'user_id'
      })

    if (error) throw error
    navigate('/')
  } catch (error) {
    console.error('Error saving preferences:', error)
  } finally {
    setIsSaving(false)
  }
}

// ... (rest of the component remains the same)
