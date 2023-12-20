'use server';

import { revalidatePath } from "next/cache";
import { IncriptPass } from "../plugins/incript/argon2";
import { CreateProductFormSchema, CreateUserFormSchema, UpdateProductFormSchema } from "../plugins/zod";
import prisma from "./db";
import { redirect } from "next/navigation";

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
    const { nombre, descripcion, precio, preparado_en, categoria } = CreateProductFormSchema.parse(rawFormData);
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
                disponibilidad: 'disponible'
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
    const { nombre, descripcion, precio, preparado_en, categoria} = UpdateProductFormSchema.parse(rawFormData);

    const productFound = await prisma.productos.findFirst({
        where: {
            nombre: nombre
        }
    });

    if (productFound) {
        return { success: false, message: 'Producto ya existe en la base de datos' }
    };

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
            }
        });
        revalidatePath('/dashboard/inventario');
        return { success: true, message: 'Producto actualizado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Producto no fue actualizado correctamente' }
    }
}