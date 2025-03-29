import { useState, useEffect } from 'react'
import RestaurantFilter from './RestaurantFilter'
import RestaurantMap from './RestaurantMap'
import { getFilteredRestaurants } from '../../services/api/restaurants'
import { Loader2 } from 'lucide-react'

export default function DiscoveryPage() {
  const [restaurants, setRestaurants] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const handleFilter = async (filters: any) => {
    try {
      setLoading(true)
      setError(null)
      const results = await getFilteredRestaurants(filters)
      setRestaurants(results)
    } catch (err) {
      setError('Failed to load restaurants. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleFilter({
      cuisines: [],
      diets: [],
      budget: [],
      atmosphere: [],
      rating: 4,
      distance: 5
    })
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-brand-primary mb-8">
        Discover Restaurants in Madrid
      </h1>
      
      <RestaurantFilter onFilter={handleFilter} />
      
      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg mb-6">
          {error}
        </div>
      )}

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin h-12 w-12 text-brand-primary" />
        </div>
      ) : (
        <RestaurantMap restaurants={restaurants} />
      )}
    </div>
  )
}
