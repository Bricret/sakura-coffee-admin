'use server';

import { IncriptPass } from "../plugins/incript/argon2";
import { CreateUserFormSchema } from "../plugins/zod";
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


