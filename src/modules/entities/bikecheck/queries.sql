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

/* @name getBikechecksCount */
SELECT COUNT("id")
FROM "Bikecheck"
WHERE "userId" = :userId AND "isActive" = TRUE;

/* @name getRank */
SELECT "rank"
FROM (
  SELECT id, "likes", row_number () over (ORDER BY "likes" desc) AS "rank"
  FROM (
    SELECT id, count("likes") AS "likes"
    FROM
    (
      SELECT id FROM "Bikecheck" b WHERE b."isActive" = TRUE
    ) AS T1
    INNER JOIN
    (
      SELECT "bikecheckId" AS "likes" FROM "BikecheckVote" bv WHERE bv.points > 0
    ) AS T2
    ON T1.id = T2."likes"
    GROUP BY T1.id
  ) T
) T
WHERE T.id = :bikecheckId;

/* @name findOnSale */
SELECT *
FROM "Bikecheck"
WHERE "onSale" = TRUE and "isActive" = TRUE
ORDER BY "saleRank" DESC;

/* @name findTopBikecheck */
SELECT "id", COUNT("bikecheckId")
FROM
  (
    SELECT * FROM "Bikecheck" b WHERE b."isActive" = TRUE
  ) AS T1
  LEFT JOIN
  (
    SELECT "bikecheckId" FROM "BikecheckVote" bv WHERE bv."points"  > 0
  ) AS T2
  ON T1.id = T2."bikecheckId"
GROUP BY T1."id"
ORDER BY "count" DESC
LIMIT 10;
