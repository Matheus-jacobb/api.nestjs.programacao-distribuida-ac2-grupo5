-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "rg" TEXT,
    "vooId" INTEGER,
    "eventoId" INTEGER,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT DEFAULT 'user'
);

-- CreateTable
CREATE TABLE "Turismo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "hotelQuartoId" TEXT NOT NULL,
    "vooId" INTEGER NOT NULL,
    "vooAssentoId" INTEGER NOT NULL,
    "eventoId" INTEGER NOT NULL,
    "totalPrice" REAL
);

-- CreateTable
CREATE TABLE "UserTurismo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "turismoId" INTEGER NOT NULL,
    "hotelReservaId" TEXT NOT NULL,
    "vooTicketId" INTEGER NOT NULL,
    "eventoTicketId" INTEGER NOT NULL,
    "totalPrice" REAL NOT NULL,
    CONSTRAINT "UserTurismo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserTurismo_turismoId_fkey" FOREIGN KEY ("turismoId") REFERENCES "Turismo" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "UserTurismo_turismoId_idx" ON "UserTurismo"("turismoId");
