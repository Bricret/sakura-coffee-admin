'use server';

import { revalidatePath } from "next/cache";
import { IncriptPass } from "../plugins/incript/argon2";
import { CreateProductFormSchema, CreateUserFormSchema, UpdateProductFormSchema } from "../plugins/zod";
import prisma from "./db";

export async function createUser(formData: FormData) {
    const { userName, password, rol } = CreateUserFormSchema.parse({
        userName: formData.get('username'),
        password: formData.get('password'),
        rol: formData.get('selectRol')
    });

    const PassIncript = await IncriptPass(password);

    const userFound = await prisma.users.findFirst({
        where: {
            name: userName
        }
    });

     if (userFound) {
        return { success: false, message: 'Usuario ya existe en la base de datos' }
     }; 

    try {
        await prisma.users.create({
            data: {
                name: userName,
                password: PassIncript,
                rol_id: rol
            }
        });
        return { success: true, message: 'Usuario creado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Usuario no creado correctamente' }
    }
}


export async function createProduct(formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries());
    const { nombre, descripcion, precio, preparado_en, categoria, disponibilidad } = CreateProductFormSchema.parse(rawFormData);
    const productFound = await prisma.productos.findFirst({
        where: {
            nombre: nombre
        }
    });
    if (productFound) {
        return { success: false, message: 'Producto ya existe en la base de datos' }
    };
    try {
        await prisma.productos.create({
            data: {
                nombre: nombre,
                descripcion: descripcion,
                precio: Number(precio),
                preparado_en: preparado_en,
                categoria_id: categoria,
                disponibilidad: disponibilidad
            }
        });
        revalidatePath('/dashboard/inventario');
        return { success: true, message: 'Producto creado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Producto no fue creado correctamente' }
    }

}

export async function updateProduct(formData: FormData, id: string) {
    const rawFormData = Object.fromEntries(formData.entries());
    const { nombre, descripcion, precio, preparado_en, categoria, disponibilidad } = UpdateProductFormSchema.parse(rawFormData);

    const productFound = await prisma.productos.findFirst({
        where: {
            nombre: nombre
        }
    });

    if(!productFound || productFound.id === id) {
        try {
            await prisma.productos.update({
                where: {
                    id: id
                },
                data: {
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: Number(precio),
                    preparado_en: preparado_en,
                    categoria_id: categoria,
                    disponibilidad: disponibilidad
                }
            });
            revalidatePath('/dashboard/inventario');
            return { success: true, message: 'Producto actualizado correctamente' }
        } catch ( error : any ) {
           console.log('error', error);
           return { success: false, message: 'Producto no fue actualizado correctamente' }
        }
    } else {
        return { success: false, message: 'Producto ya existe en la base de datos' }
    }
}

export async function deleteProduct( id: string ) {
    try {
        await prisma.productos.delete({
            where: {
                id: id.toString()
            }
        });
        revalidatePath('/dashboard/inventario');
        return { success: true, message: 'Producto eliminado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Producto no fue eliminado correctamente' }
    }
}

export async function createNewOrder(idTable: string) {
    try {
        // Verifica si ya existe una orden para la mesa
        const existingOrder = await prisma.ordens.findFirst({
            where: {
                mesa_id: idTable
            }
        });
 
        // Si no existe ninguna orden, crea una nueva
        if (!existingOrder) {
            const newOrder = await prisma.ordens.create({
                data: {
                   mesa_id: idTable,
                   sub_total_C_: 0,
                   sub_total_U_: 0,
                }
            });
            return { success: true, message: 'Orden creada correctamente', data: newOrder }
        } else {
            return { success: true, message: 'Ya existe una orden para esta mesa', data: existingOrder }
        }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Error al intentar crear la orden' }
    }
 }
 
export async function createNewDetailOrder(formData: FormData, idOrder: string, products: any, idTable: string) {

    const rawFormData = Object.fromEntries(formData.entries());
    const findProduct =  products.find((product: any) => product.nombre === rawFormData.product);

    const orderFound = await prisma.detalle_ordens.findFirst({
        where: {
            producto_id: findProduct.id,
            orden_id: idOrder
        }
    });

    if (orderFound) {
        return { success: false, message: 'Producto ya existe en la orden' }
    };

    const cantidad = Number(rawFormData.cantidad)
    const monto_C_ = cantidad * findProduct.precio;
    const monto_U_ = parseFloat((monto_C_ / 36.79).toFixed(2));

    try {
        await prisma.detalle_ordens.create({
            data: {
                orden_id: idOrder,
                producto_id: findProduct.id,
                cantidad: cantidad,
                monto_C_: monto_C_,
                monto_U_: monto_U_
            }
        });
        revalidatePath(`/dashboard/caja/newOrder/${idTable}`);
        return { success: true, message: 'Producto agregado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Producto no fue agregado correctamente', data: error }
    }
}