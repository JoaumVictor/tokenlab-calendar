/*
  Warnings:

  - You are about to drop the column `all_day` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `creator_id` on the `Event` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Event" (
    "start" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "allDay" BOOLEAN NOT NULL DEFAULT false,
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "creatorId" INTEGER NOT NULL DEFAULT 0,
    "end" DATETIME,
    CONSTRAINT "Event_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("description", "end", "id", "start", "title") SELECT "description", "end", "id", "start", "title" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
CREATE TABLE "new_ParticipantsOnEvents" (
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    PRIMARY KEY ("eventId", "userId"),
    CONSTRAINT "ParticipantsOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "ParticipantsOnEvents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_ParticipantsOnEvents" ("eventId", "userId") SELECT "eventId", "userId" FROM "ParticipantsOnEvents";
DROP TABLE "ParticipantsOnEvents";
ALTER TABLE "new_ParticipantsOnEvents" RENAME TO "ParticipantsOnEvents";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
