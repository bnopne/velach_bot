/* @name find */
SELECT *
FROM "UserChatMtm"
WHERE "userId" = :userId AND "chatId" = :chatId;

/*
  @name insert
  @param userChatMtm -> (userId, chatId)
*/
INSERT INTO "UserChatMtm" ("userId", "chatId")
VALUES :userChatMtm
RETURNING *;
