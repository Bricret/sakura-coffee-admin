'use client';

import { useEffect } from "react";

export default function BottomInvoice({ invoice } : { invoice : any }){


    function handlePrint() {
        window.print();
    }

    useEffect(() => {
        handlePrint();
    }, [])

    return (
    <>
     <h3 className="text-sm mt-2">
                ----------------------- Totales  ------------------------
            </h3>
            <article className="w-full">
                <section className="flex flex-row items-start justify-between w-full">
                    <h3 className="text-sm w-1/3">Subtotal C$</h3>
                    <h3 className="text-sm">{(invoice.total_C_ - invoice.propina_C_).toString()}</h3>
                </section>
                <section className="flex flex-row items-start justify-between w-full">
                    <h3 className="text-sm w-1/3">Subtotal U$</h3>
                    <h3 className="text-sm">{(invoice.total_U_ - invoice.propina_U_).toString()}</h3>
                </section>
                <section className="flex flex-row items-start justify-between w-full">
                    <h3 className="text-sm w-1/2">Propina Sugerida C$</h3>
                    <h3 className="text-sm">{invoice.propina_C_}</h3>
                </section>
                <section className="flex flex-row items-start justify-between w-full">
                    <h3 className="text-sm w-1/2">Propina Sugerida U$</h3>
                    <h3 className="text-sm">{invoice.propina_U_}</h3>
                </section>
                <section className="flex flex-row items-start font-bold justify-between w-full">
                    <h3 className="text-base w-1/3">Total C$</h3>
                    <h3 className="text-base">{invoice.total_C_}</h3>
                </section>
                <section className="flex flex-row items-start font-bold justify-between w-full">
                    <h3 className="text-sm w-1/3">Total U$</h3>
                    <h3 className="text-sm">{invoice.total_U_}</h3>
                </section>
                <h3 className="text-sm mt-2">
                ---------------------------------------------------------
                </h3>
                <section className="text-sm flex flex-col items-center justify-center">
                    <h3>GRACIAS POR SU VISITA</h3>
                    <h3>LE ESPERAMOS PRONTO</h3>
                </section>
            </article> 
    </>
    )
}