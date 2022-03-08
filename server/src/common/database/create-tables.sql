-- public."Chat" definition

-- Drop table

-- DROP TABLE "Chat";
DROP TABLE IF EXISTS "Chat" CASCADE;

CREATE TABLE "Chat" (
  id int8 NOT NULL,
  "type" varchar(255) NULL,
  title varchar(255) NULL,
  CONSTRAINT "Chat_pkey" PRIMARY KEY (id)
);


-- public."SequelizeMeta" definition

-- Drop table

-- DROP TABLE "SequelizeMeta";
DROP TABLE IF EXISTS "SequelizeMeta" CASCADE;

CREATE TABLE "SequelizeMeta" (
  "name" varchar(255) NOT NULL,
  CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name)
);


-- public."User" definition

-- Drop table

-- DROP TABLE "User";
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

-- Drop table

-- DROP TABLE "Bikecheck";
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

-- Drop table

-- DROP TABLE "BikecheckChatMtm";
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

-- Drop table

-- DROP TABLE "BikecheckVote";
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

-- Drop table

-- DROP TABLE "UserChatMtm";
DROP TABLE IF EXISTS "UserChatMtm" CASCADE;

CREATE TABLE "UserChatMtm" (
  "userId" int8 NOT NULL,
  "chatId" int8 NOT NULL,
  CONSTRAINT "UserChatMtm_pkey" PRIMARY KEY ("userId", "chatId"),
  CONSTRAINT "UserChatMtm_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"(id) ON UPDATE CASCADE,
  CONSTRAINT "UserChatMtm_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE
);


-- public."FeatureAnalytics" definition

-- Drop table

-- DROP TABLE "FeatureAnalytics";
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

-- Drop table

-- DROP TABLE "Migration";
DROP TABLE IF EXISTS "Migration" CASCADE;

CREATE TABLE "Migration" (
  id bigserial,
  "name" varchar(255) NOT NULL,
  "createdAt" timestamptz NOT NULL DEFAULT NOW()
);
