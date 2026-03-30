/* @name insert */
INSERT INTO "FeatureAnalytics" ("featureKey", "chatId", "userId")
VALUES (:featureKey, :chatId, :userId)
RETURNING *;
