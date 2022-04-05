/*
  Warnings:

  - A unique constraint covering the columns `[auth]` on the table `Contact` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `auth` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "auth" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Contact_auth_key" ON "Contact"("auth");
