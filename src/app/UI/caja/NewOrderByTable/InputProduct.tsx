'use client';

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { useState } from "react";

export default function InputProduct({ products } : any ) {

  const [counter, setcounter] = useState(1);

  const onReduce = (e : any) => {
    e.preventDefault()
    if (counter > 1) {
      setcounter(counter - 1)
    }
  }

  const onAdd = (e : any) => {
    e.preventDefault()
    if (counter < 10) {
      setcounter(counter + 1)
    }
  }

    return (
      <>
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
                <AutocompleteItem key={product.id} value={product.nombre}>
                {product.nombre}
                </AutocompleteItem>
            ))}
        </Autocomplete>
        <div className="flex flex-row gap-4 items-end justify-center">
            
            <button className="p-1 bg-fourth rounded-2xl hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={ (e) => onReduce(e) }>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
            </button>

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
                  defaultValue={counter}
              />
            </label>
            <button className="p-1 bg-fourth rounded-2xl hidden md:block">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={ (e) => onAdd(e) }>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
        </div>
        </>
      );
}