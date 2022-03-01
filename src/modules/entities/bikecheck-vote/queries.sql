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
