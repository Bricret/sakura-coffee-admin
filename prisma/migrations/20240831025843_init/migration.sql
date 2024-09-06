-- CreateEnum
CREATE TYPE "mesas_estado" AS ENUM ('libre', 'ocupada', 'reservada');

-- CreateEnum
CREATE TYPE "productos_disponibilidad" AS ENUM ('agotado', 'disponible');

-- CreateEnum
CREATE TYPE "productos_preparado_en" AS ENUM ('barra', 'cocina');

-- CreateEnum
CREATE TYPE "pedidos_estado_pedido" AS ENUM ('entregado', 'pendiente');

-- CreateEnum
CREATE TYPE "pedidos_estado_pago" AS ENUM ('cancelado', 'pendiente');

-- CreateEnum
CREATE TYPE "ordens_estado" AS ENUM ('pendiente', 'finalizada');

-- CreateEnum
CREATE TYPE "cajas_estado" AS ENUM ('abierto', 'cerrado');

-- CreateEnum
CREATE TYPE "facturas_metodo_pago" AS ENUM ('efectivo', 'tarjeta', 'transferencia');

-- CreateTable
CREATE TABLE "cajas" (
    "id" BIGSERIAL NOT NULL,
    "numero_caja" TEXT NOT NULL,
    "descripcion" TEXT,
    "estado" "cajas_estado" NOT NULL,

    CONSTRAINT "cajas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorias" (
    "id" BIGSERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "categorias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "detalle_ordens" (
    "id" BIGSERIAL NOT NULL,
    "orden_id" BIGINT NOT NULL,
    "producto_id" BIGINT NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "monto_C$" DOUBLE PRECISION NOT NULL,
    "monto_U$" DOUBLE PRECISION NOT NULL,
    "impreso" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "detalle_ordens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "facturas" (
    "id" BIGSERIAL NOT NULL,
    "numero_factura" BIGINT NOT NULL,
    "fecha_emision" TIMESTAMP(3) NOT NULL,
    "hora_emision" TIMESTAMP(3) NOT NULL,
    "metodo_pago" "facturas_metodo_pago" NOT NULL,
    "user_id" BIGINT NOT NULL,
    "propina_C$" DOUBLE PRECISION NOT NULL,
    "propina_U$" DOUBLE PRECISION NOT NULL,
    "descuento_C$" DOUBLE PRECISION NOT NULL,
    "descuento_U$" DOUBLE PRECISION NOT NULL,
    "total_C$" DOUBLE PRECISION NOT NULL,
    "total_U$" DOUBLE PRECISION NOT NULL,
    "orden_id" BIGINT NOT NULL,

    CONSTRAINT "facturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "flujo_cajas" (
    "id" BIGSERIAL NOT NULL,
    "fecha_apertura" TIMESTAMP(3) NOT NULL,
    "hora_apertura" TIMESTAMP(3) NOT NULL,
    "fecha_cierre" TIMESTAMP(3),
    "hora_cierre" TIMESTAMP(3),
    "observaciones" TEXT NOT NULL,
    "faltante_caja" DOUBLE PRECISION,
    "sobrante_caja" DOUBLE PRECISION NOT NULL,
    "monto_inicial_C$" DOUBLE PRECISION NOT NULL,
    "monto_inicial_U$" DOUBLE PRECISION NOT NULL,
    "monto_final_C$" DOUBLE PRECISION,
    "monto_final_U$" DOUBLE PRECISION,
    "caja_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,

    CONSTRAINT "flujo_cajas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mesas" (
    "id" BIGSERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "estado" "mesas_estado" NOT NULL DEFAULT 'libre',

    CONSTRAINT "mesas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordens" (
    "id" BIGSERIAL NOT NULL,
    "mesa_id" BIGINT,
    "pedido_id" BIGINT,
    "estado" "ordens_estado" NOT NULL,
    "sub_total_C$" DOUBLE PRECISION NOT NULL,
    "sub_total_U$" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ordens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pedidos" (
    "id" BIGSERIAL NOT NULL,
    "nombre_cliente" TEXT NOT NULL,
    "direccion_cliente" TEXT,
    "anticipo" INTEGER,
    "fecha_pedido" TIMESTAMP(3) NOT NULL,
    "fecha_entrega" TIMESTAMP(3) NOT NULL,
    "hora_entrega" TIMESTAMP(3),
    "telefono_cliente" TEXT,
    "telefono_adicional_cliente" TEXT,
    "estado_pedido" "pedidos_estado_pedido" NOT NULL DEFAULT 'pendiente',
    "estado_pago" "pedidos_estado_pago" NOT NULL DEFAULT 'pendiente',
    "observaciones" TEXT,
    "total" INTEGER NOT NULL,

    CONSTRAINT "pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permisos" (
    "id" BIGSERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "permisos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "productos" (
    "id" BIGSERIAL NOT NULL,
    "categoria_id" BIGINT NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,
    "precio" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "disponibilidad" "productos_disponibilidad" NOT NULL DEFAULT 'disponible',
    "preparado_en" "productos_preparado_en" NOT NULL,

    CONSTRAINT "productos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rol_permisos" (
    "id" BIGSERIAL NOT NULL,
    "rol_id" BIGINT NOT NULL,
    "permiso_id" BIGINT NOT NULL,

    CONSTRAINT "rol_permisos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rols" (
    "id" BIGSERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "descripcion" TEXT,

    CONSTRAINT "rols_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" BIGSERIAL NOT NULL,
    "rol_id" BIGINT,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cajas_numero_caja_key" ON "cajas"("numero_caja");

-- CreateIndex
CREATE INDEX "categorias_nombre_idx" ON "categorias"("nombre");

-- CreateIndex
CREATE INDEX "detalle_ordens_orden_id_idx" ON "detalle_ordens"("orden_id");

-- CreateIndex
CREATE INDEX "detalle_ordens_producto_id_idx" ON "detalle_ordens"("producto_id");

-- CreateIndex
CREATE UNIQUE INDEX "facturas_numero_factura_key" ON "facturas"("numero_factura");

-- CreateIndex
CREATE INDEX "facturas_orden_id_idx" ON "facturas"("orden_id");

-- CreateIndex
CREATE INDEX "facturas_user_id_idx" ON "facturas"("user_id");

-- CreateIndex
CREATE INDEX "flujo_cajas_caja_id_idx" ON "flujo_cajas"("caja_id");

-- CreateIndex
CREATE INDEX "flujo_cajas_user_id_idx" ON "flujo_cajas"("user_id");

-- CreateIndex
CREATE INDEX "ordens_mesa_id_idx" ON "ordens"("mesa_id");

-- CreateIndex
CREATE INDEX "ordens_pedido_id_idx" ON "ordens"("pedido_id");

-- CreateIndex
CREATE INDEX "pedidos_nombre_cliente_idx" ON "pedidos"("nombre_cliente");

-- CreateIndex
CREATE INDEX "productos_categoria_id_idx" ON "productos"("categoria_id");

-- CreateIndex
CREATE INDEX "productos_nombre_idx" ON "productos"("nombre");

-- CreateIndex
CREATE INDEX "rol_permisos_permiso_id_idx" ON "rol_permisos"("permiso_id");

-- CreateIndex
CREATE INDEX "rol_permisos_rol_id_idx" ON "rol_permisos"("rol_id");

-- CreateIndex
CREATE INDEX "users_rol_id_idx" ON "users"("rol_id");

-- AddForeignKey
ALTER TABLE "detalle_ordens" ADD CONSTRAINT "detalle_ordens_orden_id_fkey" FOREIGN KEY ("orden_id") REFERENCES "ordens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detalle_ordens" ADD CONSTRAINT "detalle_ordens_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "productos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_orden_id_fkey" FOREIGN KEY ("orden_id") REFERENCES "ordens"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "facturas" ADD CONSTRAINT "facturas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flujo_cajas" ADD CONSTRAINT "flujo_cajas_caja_id_fkey" FOREIGN KEY ("caja_id") REFERENCES "cajas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "flujo_cajas" ADD CONSTRAINT "flujo_cajas_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens" ADD CONSTRAINT "ordens_mesa_id_fkey" FOREIGN KEY ("mesa_id") REFERENCES "mesas"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens" ADD CONSTRAINT "ordens_pedido_id_fkey" FOREIGN KEY ("pedido_id") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "productos" ADD CONSTRAINT "productos_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "categorias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_permisos" ADD CONSTRAINT "rol_permisos_permiso_id_fkey" FOREIGN KEY ("permiso_id") REFERENCES "permisos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rol_permisos" ADD CONSTRAINT "rol_permisos_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "rols"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_rol_id_fkey" FOREIGN KEY ("rol_id") REFERENCES "rols"("id") ON DELETE CASCADE ON UPDATE CASCADE;
