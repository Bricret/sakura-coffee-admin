'use client'

import { createUser } from "@/app/lib/actions";
import { Button } from "../button";
import { ErrorToast, SuccessToast } from "@/app/plugins/sonner";
import { Toaster } from "sonner";

export default function RegisterForm( { rols, edit, user }: any ) {

    async function clientAction( formData: FormData ) {
        const result = await createUser(formData);
        if( result?.success === false ) {
            ErrorToast(result.message);
        } else {
            SuccessToast(result.message);
        }
    }

  return (
    <form action={clientAction}>
        <div className="my-5 ">
            <input
                id="username"
                name="username"
                type="text" 
                placeholder="Nombre" 
                className="border border-gray-400 py-1 px-2 w-full mb-4" 
                required
            />
            <input
                id="password"
                name="password" 
                type="password" 
                placeholder="Contraseña" 
                className="border border-gray-400 py-1 px-2 w-full mb-4"
                required
            />
            <select 
                name="selectRol"
                id="selectRol" 
                defaultValue={1}
                className="border border-gray-400 py-1 px-2 w-full mb-4 cursor-pointer"
                required
            >
                {
                    rols.map(( rol : any ) => (
                        <option value={rol.id} key={rol.id}>{rol.nombre}</option>
                    ))
                }
            </select>
        </div>
        <div className="mt-5">
            <Button>Registrar</Button>
        </div>
        <Toaster 
            dir="auto"
            visibleToasts={2}
            duration={1500}
            closeButton
            richColors
        />
    </form>
  )
}