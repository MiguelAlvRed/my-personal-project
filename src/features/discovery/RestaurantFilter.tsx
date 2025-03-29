import { useState } from 'react'
import { FilterIcon, XIcon } from 'lucide-react'

const CUISINE_TYPES = [
  'Spanish', 'Mexican', 'Japanese', 'Italian', 
  'Indian', 'Chinese', 'Thai', 'Mediterranean'
]

const DIETARY_RESTRICTIONS = [
  'Vegetarian', 'Vegan', 'Gluten-Free', 
  'Dairy-Free', 'Halal', 'Kosher'
]

const BUDGET_LEVELS = ['€', '€€', '€€€']
const ATMOSPHERE_TYPES = ['Romantic', 'Casual', 'Family', 'Luxury']

export default function RestaurantFilter({ onFilter }: { onFilter: (filters: any) => void }) {
  const [filters, setFilters] = useState({
    cuisines: [] as string[],
    diets: [] as string[],
    budget: [] as string[],
    atmosphere: [] as string[],
    rating: 0,
    distance: 5
  })

  const toggleFilter = (category: keyof typeof filters, value: string) => {
    setFilters(prev => {
      const current = prev[category] as string[]
      const updated = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value]
      return { ...prev, [category]: updated }
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-medium text-brand-primary">
          <FilterIcon className="inline mr-2" />
          Filter Restaurants
        </h2>
        <button 
          onClick={() => onFilter(filters)}
          className="px-4 py-2 bg-brand-primary text-white rounded-md hover:bg-opacity-90"
        >
          Apply Filters
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <FilterSection 
          title="Cuisine Type"
          values={CUISINE_TYPES}
          selected={filters.cuisines}
          onToggle={(v) => toggleFilter('cuisines', v)}
        />
        
        <FilterSection
          title="Dietary Restrictions"
          values={DIETARY_RESTRICTIONS}
          selected={filters.diets}
          onToggle={(v) => toggleFilter('diets', v)}
        />

        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Budget</h3>
          <div className="flex gap-2">
            {BUDGET_LEVELS.map(level => (
              <button
                key={level}
                onClick={() => toggleFilter('budget', level)}
                className={`px-3 py-1 rounded-full border ${
                  filters.budget.includes(level)
                    ? 'bg-brand-primary text-white border-brand-primary'
                    : 'border-gray-300 hover:border-brand-primary'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Minimum Rating</h3>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setFilters({...filters, rating: star})}
                className={`text-2xl ${star <= filters.rating ? 'text-yellow-500' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-sm text-gray-600">{filters.rating}+</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FilterSection({ title, values, selected, onToggle }: {
  title: string
  values: string[]
  selected: string[]
  onToggle: (value: string) => void
}) {
  return (
    <div className="space-y-2">
      <h3 className="font-medium text-gray-700">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {values.map(value => (
          <button
            key={value}
            onClick={() => onToggle(value)}
            className={`px-3 py-1 text-sm rounded-full border ${
              selected.includes(value)
                ? 'bg-brand-primary/10 text-brand-primary border-brand-primary'
                : 'border-gray-300 hover:border-brand-primary'
            }`}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  )
}
