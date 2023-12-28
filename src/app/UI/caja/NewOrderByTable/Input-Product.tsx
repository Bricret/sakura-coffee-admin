'use client';

import { createNewDetailOrder } from "@/app/lib/actions";
import { ErrorToast, SuccessToast } from "@/app/plugins/sonner";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { Toaster } from "sonner";

export default function InputProduct({ products, idOrder, idTable } : any ) {

  const ProductAction = async (formData : FormData ) => {
    const result = await createNewDetailOrder(formData, idOrder, products, idTable);
    if( result?.success === false ) {
      ErrorToast(result.message);
  } else {
      SuccessToast(result.message);
      
  }
  }

    return (
      <>
      <form action={ProductAction} className="flex flex-row gap-4 items-end justify-between">
        <Autocomplete
          isRequired
          labelPlacement="outside"
          label="Producto"
          placeholder="Busca un producto..." 
          className="w-6/12 md:w-7/12 text-lg font-semibold"
          name="product"
          id="product"
          size="lg"
          >
            {products.map((product: any) => (
              <AutocompleteItem key={product.id} value={product.id}>
                {product.nombre}
                </AutocompleteItem>
            ))}
        </Autocomplete>
        <div className="flex flex-row gap-4 items-end justify-center">


            <label htmlFor="cantidad" className="text-base font-semibold flex flex-col gap-2">Cantidad
              <input 
                  type="number"
                  name="cantidad"
                  id="cantidad"
                  max={10}
                  min={1} 
                  required
                  placeholder="Cantidad"
                  className="w-full md:w-24 p-2 bg-[#f4f4f5] rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent justify-center"
                  defaultValue={1}
                  />
            </label>
        </div>
        <button 
          type="submit"
          className="bg-fourth text-white rounded-lg p-2 w-2/12 md:w-32"
          >
          Agregar
        </button>
        
      </form>
      <Toaster 
            dir="auto"
            visibleToasts={2}
            duration={1500}
            closeButton
            richColors
        />
      </>
      );
}