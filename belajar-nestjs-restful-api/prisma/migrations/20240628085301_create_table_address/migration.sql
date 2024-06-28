/*
  Warnings:

  - You are about to alter the column `phone` on the `contacts` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE `contacts` MODIFY `last_name` VARCHAR(100) NULL,
    MODIFY `email` VARCHAR(100) NULL,
    MODIFY `phone` VARCHAR(20) NULL;

-- CreateTable
CREATE TABLE `addresses` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `street` VARCHAR(255) NULL,
    `city` VARCHAR(100) NULL,
    `province` VARCHAR(100) NULL,
    `country` VARCHAR(100) NOT NULL,
    `postal_code` VARCHAR(10) NOT NULL,
    `contact_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `addresses` ADD CONSTRAINT `addresses_contact_id_fkey` FOREIGN KEY (`contact_id`) REFERENCES `contacts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
