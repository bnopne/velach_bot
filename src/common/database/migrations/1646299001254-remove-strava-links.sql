-- Migration: remove-strava-links
UPDATE "User"
SET "stravaLink" = NULL
WHERE "id" = 1304928930;
