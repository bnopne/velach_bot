-- public."Chat" definition
DROP TABLE IF EXISTS "Chat" CASCADE;

CREATE TABLE "Chat" (
  id int8 NOT NULL,
  "type" varchar(255) NULL,
  title varchar(255) NULL,
  CONSTRAINT "Chat_pkey" PRIMARY KEY (id)
);

-- public."User" definition
DROP TABLE IF EXISTS "User" CASCADE;

CREATE TABLE "User" (
  id int8 NOT NULL,
  "isBot" bool NULL,
  "firstName" varchar(255) NULL,
  "lastName" varchar(255) NULL,
  username varchar(255) NULL,
  "stravaLink" text NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY (id)
);

-- public."Bikecheck" definition
DROP TABLE IF EXISTS "Bikecheck" CASCADE;

CREATE TABLE "Bikecheck" (
  id bigserial NOT NULL,
  "userId" int8 NOT NULL,
  "telegramImageId" varchar(255) NOT NULL,
  "isActive" bool NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  "onSale" bool NULL DEFAULT false,
  "saleRank" int NULL DEFAULT 1,
  CONSTRAINT "Bikecheck_pkey" PRIMARY KEY (id),
  CONSTRAINT "Bikecheck_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE
);

-- public."BikecheckChatMtm" definition
DROP TABLE IF EXISTS "BikecheckChatMtm" CASCADE;

CREATE TABLE "BikecheckChatMtm" (
  "bikecheckId" int8 NOT NULL,
  "chatId" int8 NOT NULL,
  "isBanned" bool NOT NULL DEFAULT false,
  CONSTRAINT "BikecheckChatMtm_pkey" PRIMARY KEY ("bikecheckId", "chatId"),
  CONSTRAINT "BikecheckChatMtm_bikecheckId_fkey" FOREIGN KEY ("bikecheckId") REFERENCES "Bikecheck"(id) ON UPDATE CASCADE,
  CONSTRAINT "BikecheckChatMtm_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"(id) ON UPDATE CASCADE
);

-- public."BikecheckVote" definition
DROP TABLE IF EXISTS "BikecheckVote" CASCADE;

CREATE TABLE "BikecheckVote" (
  id bigserial NOT NULL,
  "userId" int8 NOT NULL,
  "bikecheckId" int8 NOT NULL,
  points int4 NOT NULL,
  "createdAt" timestamptz NOT NULL,
  "updatedAt" timestamptz NOT NULL,
  CONSTRAINT "BikecheckVote_pkey" PRIMARY KEY (id),
  CONSTRAINT "BikecheckVote_bikecheckId_fkey" FOREIGN KEY ("bikecheckId") REFERENCES "Bikecheck"(id) ON UPDATE CASCADE,
  CONSTRAINT "BikecheckVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE
);

-- public."UserChatMtm" definition
DROP TABLE IF EXISTS "UserChatMtm" CASCADE;

CREATE TABLE "UserChatMtm" (
  "userId" int8 NOT NULL,
  "chatId" int8 NOT NULL,
  CONSTRAINT "UserChatMtm_pkey" PRIMARY KEY ("userId", "chatId"),
  CONSTRAINT "UserChatMtm_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"(id) ON UPDATE CASCADE,
  CONSTRAINT "UserChatMtm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE
);

-- public."FeatureAnalytics" definition
DROP TABLE IF EXISTS "FeatureAnalytics" CASCADE;

CREATE TABLE "FeatureAnalytics" (
  id bigserial,
  "feature" varchar(255) NOT NULL,
  "chatId" int8 NOT NULL,
  "userId" int8 NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT NOW(),
  CONSTRAINT "FeatureAnalytics_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"(id) ON UPDATE CASCADE,
  CONSTRAINT "FeatureAnalytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE
);

-- public."Migration" definition
DROP TABLE IF EXISTS "Migration" CASCADE;

CREATE TABLE "Migration" (
  id bigserial,
  "name" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT NOW()
);

-- public."Admin" definition
DROP TABLE IF EXISTS "Admin" CASCADE;

CREATE TABLE "Admin" (
  "userId" int8 PRIMARY KEY,
  CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE
);
