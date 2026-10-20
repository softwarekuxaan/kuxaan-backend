-- CreateTable
CREATE TABLE `enlaces` (
    `id_enlace` INTEGER NOT NULL AUTO_INCREMENT,
    `id_proyecto` INTEGER NOT NULL,
    `titulo` VARCHAR(150) NOT NULL,
    `url` VARCHAR(500) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_enlace`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `enlaces` ADD CONSTRAINT `enlaces_id_proyecto_fkey` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos`(`id_proyecto`) ON DELETE CASCADE ON UPDATE CASCADE;
