/*
# Add onboarding_complete to user_preferences
*/

ALTER TABLE user_preferences 
ADD COLUMN IF NOT EXISTS onboarding_complete BOOLEAN DEFAULT FALSE;
