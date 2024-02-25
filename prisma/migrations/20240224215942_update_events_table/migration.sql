/*
  Warnings:

  - The primary key for the `ParticipantsOnEvents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `creatorId` on the `Event` table. All the data in the column will be lost.
  - Added the required column `id` to the `ParticipantsOnEvents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ParticipantsOnEvents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "eventId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "ParticipantsOnEvents_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ParticipantsOnEvents_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_ParticipantsOnEvents" ("eventId", "userId") SELECT "eventId", "userId" FROM "ParticipantsOnEvents";
DROP TABLE "ParticipantsOnEvents";
ALTER TABLE "new_ParticipantsOnEvents" RENAME TO "ParticipantsOnEvents";
CREATE TABLE "new_Event" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "allDay" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "end" DATETIME,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Event" ("allDay", "description", "end", "id", "start", "title") SELECT "allDay", "description", "end", "id", "start", "title" FROM "Event";
DROP TABLE "Event";
ALTER TABLE "new_Event" RENAME TO "Event";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
