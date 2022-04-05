/*
  Warnings:

  - You are about to drop the column `email` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[auth]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `auth` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "email",
DROP COLUMN "phone";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "published",
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
DROP COLUMN "phone",
ADD COLUMN     "auth" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_auth_key" ON "User"("auth");
