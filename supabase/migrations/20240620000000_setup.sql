/*
# Enable PostGIS and create restaurants table
*/

BEGIN;

-- 1. Enable required extensions
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create restaurants table with proper geometry type
CREATE TABLE IF NOT EXISTS restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  location GEOMETRY(POINT, 4326) NOT NULL, -- Using geometry instead of geography
  cuisine_type TEXT[] NOT NULL DEFAULT '{}',
  dietary_options TEXT[] NOT NULL DEFAULT '{}',
  rating FLOAT CHECK (rating BETWEEN 0 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Add spatial index for better performance
CREATE INDEX IF NOT EXISTS restaurants_location_idx 
ON restaurants USING GIST(location);

-- 4. Set up Row Level Security
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" 
ON restaurants FOR SELECT USING (true);

COMMIT;
