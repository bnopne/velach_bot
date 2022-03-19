-- Migration: remove-dude-bikechecks
UPDATE "Bikecheck"
SET "isActive" = FALSE
WHERE "isActive" = TRUE AND "userId" = 479687018;
