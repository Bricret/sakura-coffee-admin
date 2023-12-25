'use client'
import { Toaster } from "sonner";
import { Button } from "../../auth/button";
import { createProduct, updateProduct } from "@/app/lib/actions";
import { ErrorToast, SuccessToast } from "@/app/plugins/sonner";
import { redirect } from "next/navigation";

const label = "font-bold text-lg mb-2"

export default function ProductForm({ categorias, ProductData } : { categorias?: any, ProductData?: any }) {

    async function ProductAction( formData: FormData ) {
        let result;
        if( ProductData ) {
        result = await updateProduct(formData, ProductData.id);
        } else {
        result = await createProduct(formData);
        }
        if( result?.success === false ) {
            ErrorToast(result.message);
        } else {
            redirect('/dashboard/inventario');
        }
    }

    return (
    <>
        <form className="flex flex-col md:flex-row md:flex-wrap gap-6 pl-4" action={ ProductAction }>
            <div className="flex flex-col w-full md:w-2/5">
                <label htmlFor="nombre" className={ label }>Nombre del producto</label>
                <input 
                    className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
                    placeholder="Hamburguesa"
                    name="nombre"
                    type="text"
                    required
                    defaultValue={ ProductData?.nombre || ''}
                    id="nombre"
                />
            </div>
            <div className="flex flex-col w-full md:w-2/5">
                <label htmlFor="descripcion" className={ label }>Descripcion del producto</label>   
                <input 
                    className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
                    placeholder="Hamburguesa con queso, lechuga, tomate y cebolla"
                    name="descripcion"
                    type="text"
                    required
                    defaultValue={ ProductData?.descripcion || ''}
                    id="descripcion"
                />
            </div>
            <div className="flex flex-col w-full md:w-2/5">
            <label htmlFor="precio" className={ label }>Precio del producto</label>   
            <input 
                className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
                name="precio"
                type="number"
                placeholder="100"
                min="0"
                step="0.1"
                id="precio"
                defaultValue={ ProductData?.precio || ''}
                required
            />
            </div>
            <div className="flex flex-col w-full md:w-2/5">
                <label htmlFor="preparado_en" className={ label }>Preparado en</label>
                <select 
                    name="preparado_en" 
                    id="preparado_en"
                    defaultValue={ ProductData?.preparado_en || ''}
                    required
                    className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
                    >
                    <option value={'cocina'}>Cocina</option>
                    <option value={'barra'}>Barra</option>
                </select>
            </div>
            <div className="flex flex-col w-full md:w-2/5 ">
                <label htmlFor="categoria" className={ label }>Categoria</label>
                <select 
                    name="categoria" 
                    id="categoria"
                    required
                    defaultValue={ ProductData?.categoria_id || ''}
                    className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
                    >
                    {
                        categorias?.map((categoria: any) => (
                            <option value={categoria.id} key={categoria.id}>{categoria.nombre}</option>
                        ))
                    }
                </select>
            </div>
            <div className="flex flex-col w-full md:w-2/5 ">
                <label htmlFor="disponibilidad" className={ label }>Disponibilidad</label>
                <select 
                    name="disponibilidad" 
                    id="disponibilidad"
                    required
                    defaultValue={ ProductData?.disponibilidad || ''}
                    className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
                    >
                    <option value={'disponible'}>Disponible</option>
                    <option value={'agotado'}>Agotado</option>
                </select>
            </div>
            <div className="flex flex-col md:w-48 mt-4">
                <Button>Guardar</Button>
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