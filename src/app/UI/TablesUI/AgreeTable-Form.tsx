'use client'

import { createUser, deleteTable, updateTable } from "@/app/lib/actions";
import { ErrorToast, SuccessToast } from "@/app/plugins/sonner";
import { Toaster } from "sonner";
import { Button } from "../auth/button";

export default function AgreeTableForm({ tables } : { tables: any }) {

    async function HandleEditTable( formData: FormData ) {
        const idTable = formData.get('inputTable');
        const stateTable = formData.get('selectState');
        const res = await updateTable( idTable as string, stateTable as string);
        if (res.success === false) {
            return ErrorToast(res.message);
        } else {
            SuccessToast(res.message);
        } 
    }

    async function HandleDeleteTable( event: any ) {
        event.preventDefault();
        const idTable = event.target.form[0].value;
        console.log(idTable);
        const res = await deleteTable( idTable as string);
        if (res.success === false) {
            return ErrorToast(res.message);
        } else {
            SuccessToast(res.message);
        } 
    }

  return (
    <form action={HandleEditTable}>
        <div className="my-5 ">
            <label htmlFor="inputTable" className="block text-sm font-medium text-gray-700">Mesa</label>
            <select 
                name="inputTable"
                id="inputTable" 
                className="border border-gray-400 py-1 px-2 w-full mb-4 cursor-pointer"
                required
            >
                <option value="">Seleccione una mesa</option>
                { tables.map( (table: any) => (
                    <option key={table.id} value={table.id}>{table.nombre}</option>
                ))}
            </select>
            <label htmlFor="selectState" className="block text-sm font-medium text-gray-700">Estado de Mesa</label>
            <select 
                name="selectState"
                id="selectState" 
                defaultValue={1}
                className="border border-gray-400 py-1 px-2 w-full mb-4 cursor-pointer"
            >
                <option value="">Seleccione un estado</option>
                <option value="libre">Libre</option>
                <option value="reservada">Reservada</option>
            </select>
        </div>
        <div className="mt-5 flex flex-row gap-4">
            <Button>Editar</Button>
            <button 
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 ease-in-out cursor-pointer w-full"
                type="button"
                onClick={HandleDeleteTable}
            >
                Eliminar
            </button>
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