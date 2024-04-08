/*
  Warnings:

  - You are about to drop the column `eventId` on the `DiscountVoucher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `DiscountVoucher` DROP FOREIGN KEY `DiscountVoucher_eventId_fkey`;

-- AlterTable
ALTER TABLE `DiscountVoucher` DROP COLUMN `eventId`;

-- CreateTable
CREATE TABLE `EventVoucher` (
    `discount` INTEGER NOT NULL,
    `eventId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `EventVoucher_eventId_key`(`eventId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EventVoucher` ADD CONSTRAINT `EventVoucher_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
