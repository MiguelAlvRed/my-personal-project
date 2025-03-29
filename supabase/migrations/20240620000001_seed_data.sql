/*
# Seed sample restaurant data for Madrid
*/

BEGIN;

INSERT INTO restaurants (name, location, cuisine_type, dietary_options, rating)
VALUES
  ('Casa Lucio', ST_SetSRID(ST_MakePoint(-3.7088, 40.4135), 4326), 
    '{"Spanish"}', 
    '{"Gluten-Free"}', 
    4.5),
    
  ('Punto MX', ST_SetSRID(ST_MakePoint(-3.6917, 40.4192), 4326),
    '{"Mexican"}',
    '{"Vegetarian", "Vegan"}',
    4.2),
    
  ('Kabuki Wellington', ST_SetSRID(ST_MakePoint(-3.6821, 40.4289), 4326),
    '{"Japanese"}',
    '{"Pescatarian"}',
    4.7);

COMMIT;
