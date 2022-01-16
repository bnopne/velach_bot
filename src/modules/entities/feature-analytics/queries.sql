/* @name insert */
INSERT INTO "FeatureAnalytics" ("feature", "chatId", "userId")
VALUES (:feature, :chatId, :userId)
RETURNING *;
