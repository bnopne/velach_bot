-- Migration: drop-reported-bikecheck-votes
DELETE FROM "BikecheckVote"
WHERE "bikecheckId" = 11888;
