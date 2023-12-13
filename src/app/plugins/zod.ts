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

