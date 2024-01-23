'use client'

import { createUser } from "@/app/lib/actions";
import { ErrorToast, SuccessToast } from "@/app/plugins/sonner";
import { Toaster } from "sonner";
import { Button } from "../auth/button";

export default function AgreeTableForm() {

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
                id="TableName"
                name="TableName"
                type="text" 
                placeholder="Nombre" 
                className="border border-gray-400 py-1 px-2 w-full mb-4" 
                required
            />
            <select 
                name="selectState"
                id="selectState" 
                defaultValue={1}
                className="border border-gray-400 py-1 px-2 w-full mb-4 cursor-pointer"
                required
            >
                <option value="">Seleccione un estado</option>
                <option value="">Libre</option>
                <option value="">Ocupada</option>
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