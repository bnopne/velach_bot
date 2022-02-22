/* @name getAll */
SELECT *
FROM "Migration"
ORDER BY "createdAt" ASC;

/* @name insert */
INSERT INTO "Migration" ("name")
VALUES (:name)
RETURNING *;

/* @name findByName */
SELECT *
FROM "Migration"
WHERE "name" = :name;
