//libreria para validaciones de datos

import { z } from "zod";

const CreateUserSchema = z.object({
    id: z.string(),
    userName: z.string(),
    password: z.string(),
    rol: z.string(),
    status: z.boolean()
});

export const CreateUserFormSchema = CreateUserSchema.omit({
    id: true,
    status: true
})


export const LoginUserSchema = z.object({
    username: z.string(),
    password: z.string()
});

export const CreateProductSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    descripcion: z.string(),
    precio: z.string(),
    preparado_en: z.string(),
    categoria: z.string(),
    status: z.boolean()
});

export const CreateProductFormSchema = CreateProductSchema.omit({
    id: true,
    status: true
});

export const UpdateProductSchema = z.object({
    id: z.string(),
    nombre: z.string(),
    descripcion: z.string(),
    precio: z.string(),
    preparado_en: z.string(),
    categoria: z.string(),
    status: z.boolean()
});

export const UpdateProductFormSchema = UpdateProductSchema.omit({
    id: true,
    status: true
});