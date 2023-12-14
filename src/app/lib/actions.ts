'use server';

import { redirect } from 'next/navigation';
import { IncriptPass } from "../plugins/incript/argon2";
import { CreateUserFormSchema } from "../plugins/zod";
import prisma from "./db";
import { revalidatePath } from "next/cache";

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
    })

     if (userFound) {
        throw new Error('Usuario ya existe');
     }  

    try {
        await prisma.users.create({
            data: {
                name: userName,
                password: PassIncript,
                rol_id: rol
            }
        });
        console.log('usuario registrado correctamente');
    } catch ( error : any ) {
       console.log('error', error);
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}