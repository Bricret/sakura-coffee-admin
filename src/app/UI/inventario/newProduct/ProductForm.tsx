'use client'
import { fonts } from "../../Fonts"

export default function ProductForm() {


    return (
    <>
        <h1 className={`text-2xl font-semibold mb-4 ml-3 ${fonts.merriweather.className}`}>Ingrese un nuevo producto</h1>
        <form className="flex flex-col md:flex-row md:flex-wrap gap-6">
            <input 
                className="border-2 border-secundary/70 w-full md:w-2/5 bg-inherit p-3 rounded-xl" 
                placeholder="Nombre del producto"
                name="nombre"
                type="text"
                required
            />   
            <input 
                className="border-2 border-secundary/70 w-full md:w-2/5 bg-inherit p-3 rounded-xl" 
                placeholder="Descripcion del producto"
                name="descripcion"
                type="text"
                required
            />   
            <input 
                className="border-2 border-secundary/70 w-full md:w-2/5 bg-inherit p-3 rounded-xl" 
                placeholder="precio del producto"
                name="precio"
                type="number"
                required
            />
            <input 
                className="border-2 border-secundary/70 w-full md:w-2/5 bg-inherit p-3 rounded-xl" 
                placeholder="Disponibilidad"
                name="disponibilidad"
                type="text"
                required
            />  
        </form>
    </>
    )
}