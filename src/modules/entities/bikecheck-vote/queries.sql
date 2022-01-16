/* @name findById */
SELECT *
FROM "BikecheckVote"
WHERE "id" = :id;

/* @name getBikecheckLikesCount */
SELECT COUNT("id")
FROM "BikecheckVote"
WHERE "points" > 0 AND "bikecheckId" = :bikecheckId;

/* @name getBikecheckDislikesCount */
SELECT COUNT("id")
FROM "BikecheckVote"
WHERE "points" < 0 AND "bikecheckId" = :bikecheckId;

/* @name selectByUserAndBikecheck */
SELECT *
FROM "BikecheckVote"
WHERE "userId" = :userId AND "bikecheckId" = :bikecheckId;

/* @name insert */
INSERT INTO "BikecheckVote" ("userId", "bikecheckId", "points", "createdAt", "updatedAt")
VALUES (:userId, :bikecheckId, :points, NOW(), NOW())
RETURNING *;

/* @name update */
UPDATE "BikecheckVote"
SET "points" = :points, "updatedAt" = NOW()
WHERE "id" = :bikecheckVoteId
RETURNING *;
