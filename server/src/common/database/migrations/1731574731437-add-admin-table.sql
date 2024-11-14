-- Migration: add-admin-table
CREATE TABLE "Admin" (
  "userId" int8 PRIMARY KEY,
  CONSTRAINT "Admin_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON UPDATE CASCADE
);

INSERT INTO "Admin" ("userId")
VALUES (128540035);
