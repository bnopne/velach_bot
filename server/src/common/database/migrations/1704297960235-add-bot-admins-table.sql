-- Migration: add-bot-admins-table
CREATE TABLE "BotAdmin" (
  "userId" int8 NOT NULL,
  CONSTRAINT "BotAdmin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE
);

INSERT INTO "BotAdmin" ("userId")
VALUES ('128540035');
