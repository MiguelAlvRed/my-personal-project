/*
# Create user preferences table

1. New Tables
  - `user_preferences`
    - `user_id` (uuid, foreign key to auth.users)
    - `diets` (text array)
    - `allergies` (text array)
    - `cuisines` (text array)
    - `created_at` (timestamp)
    - `updated_at` (timestamp)

2. Security
  - Enable RLS on user_preferences
  - Add policy for users to manage their own preferences
*/

CREATE TABLE IF NOT EXISTS user_preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id),
  diets TEXT[] DEFAULT '{}',
  allergies TEXT[] DEFAULT '{}',
  cuisines TEXT[] DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage their own preferences"
  ON user_preferences
  FOR ALL
  USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_user_preferences_modtime
BEFORE UPDATE ON user_preferences
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();
