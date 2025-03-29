/*
# Create nearby restaurants function
*/

BEGIN;

CREATE OR REPLACE FUNCTION nearby_restaurants(
  lat float,
  lng float,
  radius float
)
RETURNS TABLE (
  id uuid,
  name text,
  location geometry,
  cuisine_type text[],
  dietary_options text[],
  rating float
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    r.id,
    r.name,
    r.location,
    r.cuisine_type,
    r.dietary_options,
    r.rating
  FROM 
    restaurants r
  WHERE 
    ST_DWithin(
      r.location::geography,
      ST_SetSRID(ST_MakePoint(lng, lat), 4326)::geography,
      radius
    );
END;
$$ LANGUAGE plpgsql;

COMMIT;
