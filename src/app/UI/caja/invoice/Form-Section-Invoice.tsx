'use client';

import { useState } from "react";

export default function FormSectionInvoice({ isDollar, Order } : { isDollar : boolean, Order : any }) {

    const [cambio, setCambio] = useState(0);

    const handleChange = (e : any) => {
        const monto = Number(e.target.value);
        const cambio = monto - (isDollar ? Order.sub_total_U_ : Order.sub_total_C_);
        setCambio(Number(cambio.toFixed(2)));
    };

    return (
    <>
        <div className="flex flex-col">
            <label htmlFor="monto" className="text-secundary">{isDollar ? 'Monto U$' : 'Monto C$'}</label>
            <input 
                type="number" 
                name="monto" 
                id="monto"
                min={0}
                placeholder="Dinero recibido por el cliente"
                className="w-10/12 h-10 mb-2 border-1 p-1 border-black/40 rounded-lg shadow-small"
                onChange={handleChange}
            />
        </div>
        <div className="flex flex-col">
            <label htmlFor="cambio" className="text-secundary">Cambio</label>
            <input 
                type="number" 
                name="cambio" id="cambio" 
                readOnly
                placeholder="Cambio para el cliente"
                value={cambio}
                className="w-10/12 h-10 mb-2 p-1 border-1 border-black/40 rounded-lg shadow-small" 
            />
        </div>
</>
    )
}