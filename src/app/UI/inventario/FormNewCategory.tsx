'use client'


import { fonts } from "@/app/UI/Fonts";
import { Button } from "@/app/UI/auth/button";
import { createCategory } from "@/app/lib/actions";
import { ErrorToast, SuccessToast } from "@/app/plugins/sonner";
import { Toaster } from "sonner";


export const FormNewCategory = () => {

    const actionNewCategory = async (formData : FormData) => {
        const newCategory = await createCategory(formData);
        if (newCategory.success === true) {
            SuccessToast(newCategory.message)
        } else {
            ErrorToast(newCategory.message)
        }
    }

    //TODO: Agregar metodo para poder eliminar categorias
    const onDeleteCategory = async (e: any) => {
        e.preventDefault();
        console.log('Funciona la funcion!')
    }

  return (
    <>
    <h1
        className={ `${ fonts.merriweather.className } font-semibold text-xl mt-10 mb-4` }>
        Cree una nueva Categoria.
        </h1>
        <form className="flex flex-col gap-6 pl-4 w-full" action={actionNewCategory}>
         <div className="flex flex-col md:w-2/5">
             <label htmlFor="nombre" className=''>Nombre de la categoria</label>
             <input 
                 className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
                 placeholder="Desayunos"
                 name="nombre"
                 type="text"
                 required
                 id="nombre"
             />
         </div>
         <div className="flex flex-col w-full md:w-2/5">
             <label htmlFor="descripcion">Descripcion</label>   
             <input 
                 className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
                 placeholder="Desayunos tradicionales Nicas"
                 name="descripcion"
                 type="text"
                 required
                 id="descripcion"
             />
         </div>
         <div className="flex flex-row gap-x-3 md:w-2/5 mt-4">
            <Button>
                Crear Categoria
            </Button>
            <button 
                className="rounded-md text-center h-10 px-4 py-2 w-full bg-fourth text-white font-bold hover:bg-fourth/70"
                onClick={onDeleteCategory}>
                Eliminar Categoria
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
    </>
  )
}
