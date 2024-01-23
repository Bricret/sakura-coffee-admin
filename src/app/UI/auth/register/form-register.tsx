'use client'

import { createUser, updateUser } from "@/app/lib/actions";
import { Button } from "../button";
import { ErrorToast, SuccessToast } from "@/app/plugins/sonner";
import { Toaster } from "sonner";

export default function RegisterForm( { rols, edit, users }: any ) {


    async function clientAction( formData: FormData ) {
        let result = null;
        if (!edit) {
            result = await createUser(formData);
        }
        if (edit) {
            const rawFormData = Object.fromEntries(formData.entries());
            result = await updateUser(formData);
        }
        if (result?.success === true) {
            SuccessToast(result?.message);
        } else {
            ErrorToast(result?.message || 'Error al registrar');
        }
    }

  return (
    <form action={clientAction}>
    {
        !edit ?
        <div className="my-5">
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
        :
        <div className="my-5">
            <label htmlFor="selectUser" className="">Seleccione un usuario</label>
            <select required name="selectUser" id="selectUser" className="border border-gray-400 py-1 px-2 w-full mb-4 cursor-pointer">
                {
                    users.map(( user : any ) => (
                        <option value={user.id} key={user.id}>{user.name}</option>
                    ))
                }
            </select>
            <label htmlFor="password">{`Contraseña (Opcional)`}</label>
            <input
                id="password"
                name="password" 
                type="password" 
                placeholder="Contraseña" 
                className="border border-gray-400 py-1 px-2 w-full mb-4"
            />
            <label htmlFor="selectRol" className="">Seleccione un rol</label>
            <select 
                name="selectRol"
                id="selectRol" 
                className="border border-gray-400 py-1 px-2 w-full mb-4 cursor-pointer"
                defaultValue={2}
                required
            >
                {
                    rols.map(( rol : any ) => (
                        <option value={rol.id} key={rol.id}>{rol.nombre}</option>
                    ))
                }
            </select>
            <div>
                <input
                className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                type="checkbox"
                role="switch"
                id="state"
                defaultChecked={true}
                name="state" />
                <label
                    className="inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="state"
                >
                    Activo
                </label>
            </div>
        </div>
    }
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