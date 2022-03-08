/* @name findById */
SELECT *
FROM "Chat"
WHERE "id" = :id;

/*
  @name insertChat
  @param values -> ((id, type, title)...)
*/
INSERT INTO "Chat" ("id", "type", "title")
VALUES :values
RETURNING *;

/*
  @name updateChat
*/
UPDATE "Chat"
SET
  "type" = :type,
  "title" = :title
WHERE "id" = :id
RETURNING *;
