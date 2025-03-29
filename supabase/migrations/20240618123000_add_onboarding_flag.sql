/*
# Add onboarding_complete flag to user_preferences
*/

BEGIN;

ALTER TABLE user_preferences 
ADD COLUMN IF NOT EXISTS onboarding_complete BOOLEAN NOT NULL DEFAULT FALSE;

COMMIT;
