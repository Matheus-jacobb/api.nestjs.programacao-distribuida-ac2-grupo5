-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT DEFAULT 'user'
);

-- CreateTable
CREATE TABLE "Hotels" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Rooms" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL,
    "bedType" TEXT NOT NULL,
    "dailyPrice" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    CONSTRAINT "Rooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Reservation" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "hotelId" TEXT NOT NULL,
    "startDate" DATETIME NOT NULL,
    "endDate" DATETIME NOT NULL,
    "totalPrice" REAL NOT NULL,
    CONSTRAINT "Reservation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Rooms" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Reservation_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotels" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Rooms_hotelId_idx" ON "Rooms"("hotelId");

-- CreateIndex
CREATE INDEX "Reservation_hotelId_idx" ON "Reservation"("hotelId");

-- CreateIndex
CREATE INDEX "Reservation_userId_idx" ON "Reservation"("userId");

-- CreateIndex
CREATE INDEX "Reservation_roomId_idx" ON "Reservation"("roomId");
