-- Migration: hide-abusive-bikecheck
UPDATE "Bikecheck"
SET "isActive" = FALSE
WHERE "isActive" = TRUE AND "id" = 12563;
