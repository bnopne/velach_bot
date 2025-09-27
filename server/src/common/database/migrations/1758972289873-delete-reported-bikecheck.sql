-- Migration: delete-reported-bikecheck
UPDATE "Bikecheck"
SET "isActive" = FALSE
WHERE "id" = 25015;
