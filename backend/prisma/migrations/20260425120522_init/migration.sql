-- DropIndex
DROP INDEX "User_passwordHash_key";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "passwordHash" DROP DEFAULT;
