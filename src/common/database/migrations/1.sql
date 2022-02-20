ALTER TABLE "Bikecheck"
ALTER COLUMN "saleRank" TYPE int;

CREATE TABLE "FeatureAnalytics" (
  id bigserial,
  "feature" varchar(255) NOT NULL,
  "chatId" int8 NOT NULL,
  "userId" int8 NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT NOW(),
  CONSTRAINT "FeatureAnalytics_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"(id) ON UPDATE CASCADE,
  CONSTRAINT "FeatureAnalytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE
);
