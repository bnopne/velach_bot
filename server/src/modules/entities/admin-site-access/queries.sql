/* @name findByUserId */
SELECT *
FROM "AdminSiteAccess"
WHERE "userId" = :userId;

/* @name insert */
INSERT INTO "AdminSiteAccess" ("userId")
VALUES (:userId)
RETURNING *;
