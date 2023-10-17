-- CreateTable
CREATE TABLE `kambings` (
    `id_kambing` VARCHAR(191) NOT NULL,
    `nama_kambing` VARCHAR(191) NULL,
    `jenis_kambing` VARCHAR(191) NULL,
    `jenis_kelamin` VARCHAR(191) NULL,
    `tanggal_lahir` DATETIME(3) NULL,
    `bobot` DOUBLE NULL,
    `status` ENUM('hidup', 'mati', 'terjual', 'sakit') NULL,
    `rfid` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `id_kandang` VARCHAR(191) NULL,

    PRIMARY KEY (`id_kambing`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kandangs` (
    `id_kandang` VARCHAR(191) NOT NULL,
    `nama_kandang` VARCHAR(191) NULL,
    `gambar_kandang` VARCHAR(191) NULL,
    `id_kambing` VARCHAR(191) NULL,
    `id_pakan` VARCHAR(191) NULL,
    `id_sensor` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_kandang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pakans` (
    `id_pakan` VARCHAR(191) NOT NULL,
    `id_user` VARCHAR(191) NULL,
    `nama_pakan` VARCHAR(191) NULL,
    `jenis_pakan` VARCHAR(191) NULL,
    `satuan_pakan` VARCHAR(191) NULL,
    `jadwal_pakan` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_pakan`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mq135s` (
    `id_mq135` VARCHAR(191) NOT NULL,
    `id_kandang` VARCHAR(191) NULL,
    `amonia` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_mq135`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dht22s` (
    `id_dht22` VARCHAR(191) NOT NULL,
    `id_kandang` VARCHAR(191) NULL,
    `temperature` DOUBLE NULL,
    `humidity` DOUBLE NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id_dht22`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `kambings` ADD CONSTRAINT `kambings_id_kandang_fkey` FOREIGN KEY (`id_kandang`) REFERENCES `kandangs`(`id_kandang`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `pakans` ADD CONSTRAINT `pakans_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mq135s` ADD CONSTRAINT `mq135s_id_kandang_fkey` FOREIGN KEY (`id_kandang`) REFERENCES `kandangs`(`id_kandang`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dht22s` ADD CONSTRAINT `dht22s_id_kandang_fkey` FOREIGN KEY (`id_kandang`) REFERENCES `kandangs`(`id_kandang`) ON DELETE SET NULL ON UPDATE CASCADE;
