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

  return (
    <>
    <h1
        className={ `${ fonts.merriweather.className } font-semibold text-xl mt-10 mb-4` }>
        Cree una nueva Categoria.
        </h1>
        <form className="flex flex-col gap-6 pl-4" action={actionNewCategory}>
         <div className="flex flex-col w-full md:w-2/5">
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
         <div className="flex flex-col md:w-48 mt-4">
            <Button>
                Crear Categoria
            </Button>
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
