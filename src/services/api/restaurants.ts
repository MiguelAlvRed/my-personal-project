import { supabase } from '../supabase'

interface Restaurant {
  id: string
  name: string
  location: { lat: number; lng: number }
  cuisine_type: string[]
  dietary_options: string[]
  rating: number
}

export async function getNearbyRestaurants(lat: number, lng: number, radiusKm: number = 5) {
  const { data, error } = await supabase.rpc('nearby_restaurants', {
    lat,
    lng,
    radius: radiusKm * 1000 // Convert km to meters
  })

  if (error) {
    console.error('Error fetching restaurants:', error)
    return []
  }

  return data.map((r: any) => ({
    ...r,
    location: {
      lat: r.location.coordinates[1],
      lng: r.location.coordinates[0]
    }
  })) as Restaurant[]
}
