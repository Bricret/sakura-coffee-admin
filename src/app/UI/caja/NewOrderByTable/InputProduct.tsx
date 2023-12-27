'use client';

import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

export default function InputProduct({ products } : any ) {
    return (
        <Autocomplete 
          label="Elige un producto..." 
          className="w-6/12 md:w-5/12"
          name="product"
          id="product"
        >
            {products.map((product: any) => (
                <AutocompleteItem key={product.id} value={product.nombre}>
                {product.nombre}
                </AutocompleteItem>
            ))}
        </Autocomplete>
      );
}