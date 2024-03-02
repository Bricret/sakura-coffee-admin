'use client';

import { useState } from "react";

export default function FormSectionInvoice({ isDollar, Order } : { isDollar : boolean, Order : any }) {

    const [cambio_U$, setCambio_U$] = useState(0);
    const [cambio_C$, setCambio_C$] = useState(0);
    const propina_C =parseFloat((Order.sub_total_C_ * 0.10).toFixed(2));


    const handleChange = (e : any) => {
        const monto = Number(e.target.value);
        const cambio = monto - (isDollar ? Order.sub_total_U_ : Order.sub_total_C_);
        setCambio_U$(Number(cambio.toFixed(2)));
        const cambioEnCordobas = Number(cambio.toFixed(2)) * parseFloat(process.env.NEXT_PUBLIC_CONVERSION_RATE as string)
        setCambio_C$(Number(cambioEnCordobas.toFixed(2)));
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
                className="h-10 mb-2 border-1 p-1 border-black/40 rounded-lg shadow-small"
                onChange={handleChange}
            />
        </div>
        {
            isDollar ? (
            <article className="flex w-full">
                <section className="flex flex-col w-1/2">
                    <label htmlFor="cambio U$" className="text-secundary">Cambio U$</label>
                    <input 
                        type="number" 
                        name="cambio U$" id="cambio U$" 
                        readOnly
                        placeholder="Cambio para el cliente en dolares"
                        value={cambio_U$}
                        className="w-10/12 h-10 mb-2 p-1 border-1 border-black/40 rounded-lg shadow-small" 
                    />
                </section>
                <section className="flex flex-col w-1/2">
                    <label htmlFor="cambio C$" className="text-secundary">Cambio C$</label>
                    <input 
                        type="number" 
                        name="cambio C$" id="cambio C$" 
                        readOnly
                        placeholder="Cambio para el cliente en cordobas"
                        value={cambio_C$}
                        className="w-10/12 h-10 mb-2 p-1 border-1 border-black/40 rounded-lg shadow-small" 
                    />
                </section>
            </article>
            ) :
            <article className="flex w-full">
                <section className="flex flex-col w-1/2">
                    <label htmlFor="cambio" className="text-secundary">Cambio</label>
                    <input 
                        type="number" 
                        name="cambio" id="cambio" 
                        readOnly
                        placeholder="Cambio para el cliente"
                        value={cambio_U$}
                        className="w-10/12 h-10 mb-2 p-1 border-1 border-black/40 rounded-lg shadow-small" 
                    />
                </section>
                <section className="flex flex-col w-1/2">
                    <label htmlFor="cambio" className="text-secundary">Cambio con propina</label>
                    <input 
                        type="number" 
                        name="cambio" id="cambio" 
                        readOnly
                        placeholder="Cambio para el cliente"
                        value={(cambio_U$ - propina_C)}
                        className="h-10 mb-2 p-1 border-1 border-black/40 rounded-lg shadow-small" 
                    />
                </section>
            </article>
        }
</>
    )
}