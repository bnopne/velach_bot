/* @name insertActive */
INSERT INTO "Bikecheck" ("userId", "telegramImageId", "isActive", "createdAt", "updatedAt", "onSale")
VALUES (:userId, :telegramImageId, TRUE, NOW(), NOW(), FALSE)
RETURNING *;

/* @name findById */
SELECT *
FROM "Bikecheck"
WHERE "id" = :id;

/* @name findActive */
SELECT *
FROM "Bikecheck"
WHERE "userId" = :userId AND "isActive" = TRUE
ORDER BY "createdAt" DESC;

/* @name findInactive */
SELECT *
FROM "Bikecheck"
WHERE "userId" = :userId AND "isActive" = FALSE
ORDER BY "createdAt" DESC;

/* @name update */
UPDATE "Bikecheck"
SET
  "userId" = :userId,
  "telegramImageId" = :telegramImageId,
  "isActive" = :isActive,
  "updatedAt" = NOW(),
  "onSale" = :onSale,
  "saleRank" = :saleRank
WHERE "id" = :id
RETURNING *;

/* @name getActiveBikechecksCount */
SELECT COUNT("id")
FROM "Bikecheck"
WHERE "userId" = :userId AND "isActive" = TRUE;

/* @name findOnSale */
SELECT *
FROM "Bikecheck"
WHERE "onSale" = TRUE and "isActive" = TRUE
ORDER BY "saleRank" DESC;

/* @name findLiked */
SELECT T_BIKECHECK.*, T_VOTE."updatedAt" AS "likeDate"
FROM
(
  SELECT *
  FROM "Bikecheck"
  where "isActive" = TRUE
) T_BIKECHECK
INNER JOIN
(
  SELECT "bikecheckId", "updatedAt"
  FROM "BikecheckVote"
  WHERE "userId" = :userId AND "points" > 0
) T_VOTE
ON T_BIKECHECK."id" = T_VOTE."bikecheckId"
ORDER BY "likeDate" DESC;
