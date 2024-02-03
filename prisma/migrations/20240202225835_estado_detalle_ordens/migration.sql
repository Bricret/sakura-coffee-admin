-- CreateTable
CREATE TABLE `cajas` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `numero_caja` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NULL,
    `estado` ENUM('abierto', 'cerrado') NOT NULL,

    UNIQUE INDEX `cajas_numero_caja_unique`(`numero_caja`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `categorias` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NULL,

    INDEX `categorias_nombre_index`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `detalle_ordens` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `orden_id` BIGINT UNSIGNED NOT NULL,
    `producto_id` BIGINT UNSIGNED NOT NULL,
    `cantidad` INTEGER NOT NULL,
    `monto_C$` DOUBLE NOT NULL,
    `monto_U$` DOUBLE NOT NULL,
    `impreso` BOOLEAN NOT NULL DEFAULT false,

    INDEX `detalle_ordens_orden_id_index`(`orden_id`),
    INDEX `detalle_ordens_producto_id_index`(`producto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `facturas` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `numero_factura` BIGINT NOT NULL,
    `fecha_emision` DATE NOT NULL,
    `hora_emision` TIME(0) NOT NULL,
    `metodo_pago` ENUM('efectivo', 'tarjeta', 'transferencia') NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `propina_C$` DOUBLE NOT NULL,
    `propina_U$` DOUBLE NOT NULL,
    `descuento_C$` DOUBLE NOT NULL,
    `descuento_U$` DOUBLE NOT NULL,
    `total_C$` DOUBLE NOT NULL,
    `total_U$` DOUBLE NOT NULL,
    `orden_id` BIGINT UNSIGNED NOT NULL,

    UNIQUE INDEX `facturas_numero_factura_unique`(`numero_factura`),
    INDEX `facturas_orden_id_index`(`orden_id`),
    INDEX `facturas_user_id_index`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `flujo_cajas` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `fecha_apertura` DATE NOT NULL,
    `hora_apertura` TIME(0) NOT NULL,
    `fecha_cierre` DATE NULL,
    `hora_cierre` TIME(0) NULL,
    `observaciones` VARCHAR(150) NOT NULL,
    `faltante_caja` DOUBLE NULL,
    `sobrante_caja` DOUBLE NOT NULL,
    `monto_inicial_C$` DOUBLE NOT NULL,
    `monto_inicial_U$` DOUBLE NOT NULL,
    `monto_final_C$` DOUBLE NULL,
    `monto_final_U$` DOUBLE NULL,
    `caja_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,

    INDEX `flujo_cajas_caja_id_index`(`caja_id`),
    INDEX `flujo_cajas_user_id_index`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mesas` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `estado` ENUM('libre', 'ocupada', 'reservada') NOT NULL DEFAULT 'libre',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ordens` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `mesa_id` BIGINT UNSIGNED NULL,
    `pedido_id` BIGINT UNSIGNED NULL,
    `estado` ENUM('pendiente', 'finalizada') NOT NULL,
    `sub_total_C$` DOUBLE NOT NULL,
    `sub_total_U$` DOUBLE NOT NULL,

    INDEX `ordens_mesa_id_index`(`mesa_id`),
    INDEX `ordens_pedido_id_index`(`pedido_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `pedidos` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre_cliente` VARCHAR(255) NOT NULL,
    `direccion_cliente` VARCHAR(255) NULL,
    `anticipo` INTEGER NULL,
    `fecha_pedido` DATE NOT NULL,
    `fecha_entrega` DATE NOT NULL,
    `hora_entrega` TIME(0) NULL,
    `telefono_cliente` VARCHAR(255) NULL,
    `telefono_adicional_cliente` VARCHAR(255) NULL,
    `estado_pedido` ENUM('entregado', 'pendiente') NOT NULL DEFAULT 'pendiente',
    `estado_pago` ENUM('cancelado', 'pendiente') NOT NULL DEFAULT 'pendiente',
    `observaciones` TEXT NULL,
    `total` INTEGER NOT NULL,

    INDEX `pedidos_nombre_cliente_index`(`nombre_cliente`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `permisos` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `productos` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `categoria_id` BIGINT UNSIGNED NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NULL,
    `precio` FLOAT NOT NULL DEFAULT 0.00,
    `disponibilidad` ENUM('agotado', 'disponible') NOT NULL DEFAULT 'disponible',
    `preparado_en` ENUM('barra', 'cocina') NOT NULL,

    INDEX `productos_categoria_id_index`(`categoria_id`),
    INDEX `productos_nombre_index`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rol_permisos` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `rol_id` BIGINT UNSIGNED NOT NULL,
    `permiso_id` BIGINT UNSIGNED NOT NULL,

    INDEX `rol_permisos_permiso_id_index`(`permiso_id`),
    INDEX `rol_permisos_rol_id_index`(`rol_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `rols` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `descripcion` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `rol_id` BIGINT UNSIGNED NULL,
    `name` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    INDEX `users_rol_id_index`(`rol_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `detalle_ordens` ADD CONSTRAINT `detalle_ordens_orden_id_foreign` FOREIGN KEY (`orden_id`) REFERENCES `ordens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `detalle_ordens` ADD CONSTRAINT `detalle_ordens_producto_id_foreign` FOREIGN KEY (`producto_id`) REFERENCES `productos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facturas` ADD CONSTRAINT `facturas_orden_id_foreign` FOREIGN KEY (`orden_id`) REFERENCES `ordens`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `facturas` ADD CONSTRAINT `facturas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flujo_cajas` ADD CONSTRAINT `flujo_cajas_caja_id_foreign` FOREIGN KEY (`caja_id`) REFERENCES `cajas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `flujo_cajas` ADD CONSTRAINT `flujo_cajas_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordens` ADD CONSTRAINT `ordens_mesa_id_foreign` FOREIGN KEY (`mesa_id`) REFERENCES `mesas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ordens` ADD CONSTRAINT `ordens_pedido_id_foreign` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `productos` ADD CONSTRAINT `productos_categoria_id_foreign` FOREIGN KEY (`categoria_id`) REFERENCES `categorias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rol_permisos` ADD CONSTRAINT `rol_permisos_permiso_id_foreign` FOREIGN KEY (`permiso_id`) REFERENCES `permisos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rol_permisos` ADD CONSTRAINT `rol_permisos_rol_id_foreign` FOREIGN KEY (`rol_id`) REFERENCES `rols`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_rol_id_foreign` FOREIGN KEY (`rol_id`) REFERENCES `rols`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
