'use server';


import { revalidatePath } from "next/cache";
import { IncriptPass } from "../plugins/incript/argon2";
import { CreateUserFormSchema } from "../plugins/zod";
import prisma from "./db";

export async function createUser(formData: FormData) {
    throw new Error('Error al registrar al usuario');
    const { userName, password, rol } = CreateUserFormSchema.parse({
        userName: formData.get('username'),
        password: formData.get('password'),
        rol: formData.get('selectRol')
    });

    const PassIncript = await IncriptPass(password);

    try {
        await prisma.users.create({
            data: {
                name: userName,
                password: PassIncript,
                rol_id: rol
            }
        });
        console.log('usuario registrado correctamente')
        revalidatePath('/registerUser');
        return { message: 'Usuario creado correctamente.' }
        
    } catch ( error : any ) {
        
    }

}