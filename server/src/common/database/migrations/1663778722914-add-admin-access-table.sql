-- Migration: add-admin-access-table
CREATE TABLE "AdminSiteAccess" (
  "userId" int8 NOT NULL,
  CONSTRAINT "AdminSiteAccess_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE
);

INSERT INTO "AdminSiteAccess" ("userId")
VALUES ('128540035');
