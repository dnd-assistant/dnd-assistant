-- AlterTable
ALTER TABLE "User" ALTER COLUMN "passwordHash" DROP NOT NULL,
ALTER COLUMN "passwordSalt" DROP NOT NULL,
ALTER COLUMN "passwordVersion" DROP NOT NULL;
