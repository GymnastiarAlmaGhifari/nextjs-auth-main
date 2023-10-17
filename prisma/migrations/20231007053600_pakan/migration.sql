-- AlterTable
ALTER TABLE `pakans` ADD COLUMN `id_kandang` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `pakans` ADD CONSTRAINT `pakans_id_kandang_fkey` FOREIGN KEY (`id_kandang`) REFERENCES `kandangs`(`id_kandang`) ON DELETE SET NULL ON UPDATE CASCADE;
