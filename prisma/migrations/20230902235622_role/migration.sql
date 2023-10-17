-- DropIndex
DROP INDEX `users_email_key` ON `users`;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `user` ENUM('user', 'admin') NOT NULL DEFAULT 'user';
