-- AlterTable
ALTER TABLE "User" ALTER COLUMN "auth" DROP DEFAULT;
DROP SEQUENCE "user_auth_seq";
