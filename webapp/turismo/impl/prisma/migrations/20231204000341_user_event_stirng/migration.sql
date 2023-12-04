-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "rg" TEXT,
    "hotelId" TEXT,
    "vooId" INTEGER,
    "eventoId" INTEGER,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT DEFAULT 'user'
);
INSERT INTO "new_Users" ("createdAt", "email", "eventoId", "hotelId", "id", "name", "password", "rg", "role", "updatedAt", "vooId") SELECT "createdAt", "email", "eventoId", "hotelId", "id", "name", "password", "rg", "role", "updatedAt", "vooId" FROM "Users";
DROP TABLE "Users";
ALTER TABLE "new_Users" RENAME TO "Users";
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
