/*
  Warnings:

  - You are about to drop the column `description` on the `Cards` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Cards` table. All the data in the column will be lost.
  - Added the required column `message` to the `Cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cards" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "author" TEXT,
ADD COLUMN     "message" TEXT NOT NULL,
ALTER COLUMN "likes" SET DEFAULT 0;
