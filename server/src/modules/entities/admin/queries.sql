/* @name findByUserId */
SELECT *
FROM "Admin"
WHERE "userId" = :userId;


/* @name insertAdmin */
INSERT INTO "Admin" ("userId")
VALUES (:userId)
RETURNING *;

/* @name deleteAdmin */
DELETE FROM "Admin"
WHERE "userId" = :userId;
