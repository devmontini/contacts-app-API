-- AlterTable
CREATE SEQUENCE "user_auth_seq";
ALTER TABLE "User" ALTER COLUMN "auth" SET DEFAULT nextval('user_auth_seq');
ALTER SEQUENCE "user_auth_seq" OWNED BY "User"."auth";
