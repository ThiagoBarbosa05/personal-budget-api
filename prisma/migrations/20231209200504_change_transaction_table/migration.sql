/*
  Warnings:

  - You are about to drop the column `amount` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `transactions` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `transactions` table. All the data in the column will be lost.
  - Added the required column `payment_amount` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_recipient` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "amount",
DROP COLUMN "category",
DROP COLUMN "description",
DROP COLUMN "type",
ADD COLUMN     "payment_amount" INTEGER NOT NULL,
ADD COLUMN     "payment_recipient" TEXT NOT NULL;
