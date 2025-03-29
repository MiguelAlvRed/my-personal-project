import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import { Check, X } from 'lucide-react'

const DIET_TYPES = [
  'Vegetarian',
  'Vegan',
  'Pescatarian',
  'Gluten-Free',
  'Dairy-Free',
  'Keto',
  'Paleo',
  'Low-Carb',
  'Halal',
  'Kosher'
]

const ALLERGIES = [
  'Peanuts',
  'Tree Nuts',
  'Shellfish',
  'Fish',
  'Eggs',
  'Milk',
  'Wheat',
  'Soy',
  'Sesame',
  'Mustard'
]

const CUISINE_TYPES = [
  'Spanish',
  'Mexican',
  'Japanese',
  'Italian',
  'Indian',
  'Chinese',
  'Thai',
  'French',
  'Mediterranean',
  'Modern',
  'Fusion',
  'American',
  'Vegetarian',
  'Vegan'
]

interface Preferences {
  diets: string[]
  allergies: string[]
  cuisines: string[]
}

export default function DietaryPreferences() {
  const [preferences, setPreferences] = useState<Preferences>({
    diets: [],
    allergies: [],
    cuisines: []
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return

        const { data, error } = await supabase
          .from('user_preferences')
          .select('diets, allergies, cuisines')
          .eq('user_id', user.id)
          .single()

        if (error) throw error
        if (data) setPreferences(data)
      } catch (error) {
        console.error('Error fetching preferences:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPreferences()
  }, [])

  const togglePreference = (category: keyof Preferences, value: string) => {
    setPreferences(prev => {
      const current = prev[category]
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
      
      return { ...prev, [category]: updated }
    })
  }

  const savePreferences = async () => {
    setSaving(true)
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await supabase
        .from('user_preferences')
        .upsert({
          user_id: user.id,
          ...preferences,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
    } catch (error) {
      console.error('Error saving preferences:', error)
    } finally {
      setSaving(false)
    }
  }

  const renderChips = (category: keyof Preferences, options: string[]) => (
    <div className="flex flex-wrap gap-2 mb-6">
      {options.map(option => (
        <button
          key={option}
          type="button"
          onClick={() => togglePreference(category, option)}
          className={`flex items-center px-3 py-1 rounded-full text-sm border ${
            preferences[category].includes(option)
              ? 'bg-brand-primary text-white border-brand-primary'
              : 'bg-white text-gray-700 border-gray-300 hover:border-brand-primary'
          }`}
        >
          {option}
          {preferences[category].includes(option) && (
            <X className="ml-1 h-3 w-3" />
          )}
        </button>
      ))}
    </div>
  )

  if (loading) return <div className="text-center py-8">Loading preferences...</div>

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Dietary Preferences</h2>
      
      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Diet Types</h3>
        {renderChips('diets', DIET_TYPES)}
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Allergies & Restrictions</h3>
        {renderChips('allergies', ALLERGIES)}
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-medium text-gray-700 mb-3">Preferred Cuisines</h3>
        {renderChips('cuisines', CUISINE_TYPES)}
      </div>

      <button
        onClick={savePreferences}
        disabled={saving}
        className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-opacity-90 transition flex items-center"
      >
        {saving ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Saving...
          </>
        ) : (
          <>
            <Check className="mr-2 h-4 w-4" />
            Save Preferences
          </>
        )}
      </button>
    </div>
  )
}
