-- Migration: cleanup-reported-top-bikecheck
UPDATE "Bikecheck"
SET "isActive" = false
WHERE id = 11888;
