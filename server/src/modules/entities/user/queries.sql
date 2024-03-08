/* @name findById */
SELECT *
FROM "User"
WHERE "id" = :id;

/*
  @name insertUser
  @param values -> ((id, firstName, lastName, username, isBot, stravaLink)...)
*/
INSERT INTO "User" ("id", "firstName", "lastName", "username", "isBot", "stravaLink")
VALUES :values
RETURNING *;

/*
  @name updateUser
*/
UPDATE "User"
SET
  "firstName" = :firstName,
  "lastName" = :lastName,
  "username" = :username,
  "isBot" = :isBot,
  "stravaLink" = :stravaLink
WHERE "id" = :id
RETURNING *;

/*
  @name getUsersList
*/
SELECT *
FROM "User"
WHERE
  "firstName" ILIKE :search OR
  "lastName" ILIKE :search OR
  "username" ILIKE :search
LIMIT :limit
OFFSET :offset;

/* @name getCount */
SELECT COUNT("id")
FROM "User";
