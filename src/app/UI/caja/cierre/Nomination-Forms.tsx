'use client';

import { updateCashFlow } from "@/app/lib/actions";
import { 
    TableNominationCardCash,
    TableNominationDolarsBanknote, 
    TableNominationNationalBanknote, 
    TableNominationNationalCoin } 
from "@/app/lib/data/Local-Data";
import { calcularTotalMonto, handleInputChangeMontos } from "@/app/lib/utils";
import { ErrorToast, SuccessToast } from "@/app/plugins/sonner";

import { useEffect, useState } from "react";
import { Toaster } from "sonner";


export default function NominationForms({ Cashflow, Invoice } : { Cashflow: any, Invoice: any }) {

    const [montos, setMontos] = useState<Record<string, number>>({});
    const [totalMonto, setTotalMonto] = useState<number>(Cashflow.monto_inicial_C_);

    const totalinvoice = Invoice?.reduce((acc: number, item: any) => {
        return acc + item.total_C_;
    }, 0);

    const propinainvoice = Invoice?.reduce((acc: number, item: any) => {
        return acc + item.propina_C_;
    }, 0);

    const absolutetotalinvoice = totalinvoice + Cashflow.monto_inicial_C_;
    const allInvoiceTarjeta = Invoice?.filter((item: any) => item.metodo_pago === 'tarjeta');

    const diferencia = totalMonto - absolutetotalinvoice;

    useEffect(() => {
        calcularTotalMonto(montos, Cashflow.monto_inicial_C_, setTotalMonto);
    }, [montos]);

    async function clientAction( formData: FormData ) {
        const res = await updateCashFlow(formData, diferencia, Cashflow.id, absolutetotalinvoice);
         res?.success === false && ErrorToast(res.message);
    }

    return (
        <main className="flex flex-row gap-4 mt-6 md:mt-10">
            <article >
                <h2 className="text-xl font-semibold ">Billetes <span className="text-blue-500">CORDOBAS</span></h2>
                <form action="" className="border-2 border-black/40 p-2 rounded-md">
                    {
                    TableNominationNationalBanknote.map((item) => (
                        <div className="flex flex-row gap-2" key={item.name}>
                            <div className="flex flex-col w-1/2">
                                <label htmlFor={item.name}>{item.label}</label>
                                <input 
                                type="number" 
                                name={item.name}
                                id={item.name}
                                min="0"
                                max="200"
                                className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                                onChange={(e) => handleInputChangeMontos(e, item.factor, item.name, setMontos)}
                                />
                            </div>
                            <div className="flex flex-col w-1/2">
                                <label htmlFor={item.montoid}>Monto</label>
                                <input 
                                type="number" 
                                name={item.montoid}
                                id={item.montoid}
                                value={montos[item.name] || ''}
                                readOnly
                                className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                                />
                            </div>
                        </div>

                    ))
                    }
                </form>
            </article>
            <div className="flex flex-col">
            <article className="mb-4">
            <h2 className="text-xl font-semibold ">Monedas <span className="text-blue-500">CORDOBAS</span></h2>
                <form action="" className="border-2 border-black/40 p-2 rounded-md">
                    {
                    TableNominationNationalCoin.map((item) => (
                        <div className="flex flex-row gap-2" key={item.name}>
                            <div className="flex flex-col w-full">
                                <label htmlFor={item.label}>{item.label}</label>
                                <input 
                                type="number" 
                                name={item.label}
                                id={item.label}
                                min="0"
                                max="200"
                                className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                                onChange={(e) => handleInputChangeMontos(e, item.factor, item.name, setMontos)}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor={item.montoid}>Monto</label>
                                <input 
                                type="number" 
                                name={item.montoid}
                                id={item.montoid}
                                readOnly
                                className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                                value={montos[item.name] || ''}
                                />
                            </div>
                        </div>

                    ))
                    }
                </form>
            </article>
            <article>
            <h2 className="text-xl font-semibold ">Billetes <span className="text-red-500">DOLARES</span></h2>
                <form action="" className="border-2 border-black/40 p-2 rounded-md">
                    {
                    TableNominationDolarsBanknote.map((item) => (
                        <div className="flex flex-row gap-2" key={item.name}>
                            <div className="flex flex-col w-full">
                                <label htmlFor={item.name}>{item.label}</label>
                                <input 
                                type="number" 
                                name={item.name}
                                id={item.name}
                                min="0"
                                max="200"
                                className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                                onChange={(e) => handleInputChangeMontos(e, item.factor, item.name, setMontos)}
                                />
                            </div>
                            <div className="flex flex-col w-full">
                                <label htmlFor={item.montoid}>Monto en <span className="text-blue-500">CORDOBAS</span></label>
                                <input 
                                type="number" 
                                name={item.montoid}
                                id={item.montoid}
                                readOnly
                                className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                                value={montos[item.name] || ''}
                                />
                            </div>
                        </div>

                    ))
                    }
                </form>
            </article>
            </div>
            <section>
                <h2 className="text-xl font-semibold ">Pago con <span className="text-blue-500">Tarjeta</span></h2>
                <form action="" className="border-2 border-black/40 w-full p-2 rounded-md">
                    {
                        TableNominationCardCash.map((item) => (
                        <div className="flex flex-row gap-2" key={item.montoid}>
                            <div className="flex flex-col w-full">
                                <label htmlFor={item.name}>{item.label}</label>
                                <input 
                                type="number" 
                                name={item.name}
                                id={item.name}
                                min="0"
                                max="200"
                                readOnly={allInvoiceTarjeta.length === 0 ? true : false}
                                className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                                onChange={(e) => handleInputChangeMontos(e, item.factor, item.name, setMontos)}
                                />
                            </div>
                            <div>
                                <label htmlFor="lengthPays">Cantidad</label>
                                <input
                                    type="number"
                                    name="lengthPays"
                                    id="lengthPays"
                                    readOnly
                                    value={allInvoiceTarjeta.length || 0}
                                    className="w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring"
                                />
                            </div>
                        </div>
                        ))
                    }
                </form>
                <section className="border-2 border-black/40 p-2 rounded-md mt-4">
                    <h2 className="text-xl font-semibold ">Cierre de Caja</h2>
                    <div className="flex items-center text-start">
                        <h3 className="text-lg w-10/12">Total Contable:</h3>
                        <p className={`text-2xl font-semibold text-green-500 ${
                            Number(totalMonto.toFixed(2)) >= absolutetotalinvoice ? 'text-green-500' : 'text-red-500'
                        }`}>{totalMonto.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center text-start">
                        <h3 className="text-lg w-10/12">Total Ingresos:</h3>
                        <p className="text-2xl font-semibold">{absolutetotalinvoice.toFixed(2)}</p>
                    
                    </div>
                    <div className="flex items-center text-start">
                        <h3 className="text-lg w-10/12">Diferencia:</h3>
                        <p className={`text-2xl font-semibold ${
                            Number(totalMonto.toFixed(2)) >= absolutetotalinvoice ? 'text-green-500' : 'text-red-500'
                        }`}>{diferencia.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center text-start border-b-1 border-b-black/30">
                        <h3 className="text-lg w-10/12">Propina:</h3>
                        <p className={`text-2xl font-semibold`}>{propinainvoice.toFixed(2)}</p>
                    </div>
                    <form action={clientAction} className="items-center justify-center text-start mt-2">
                        <label htmlFor="feedback" className="text-xl font-semibold">Observaciones</label>
                        <textarea 
                            name="feedback" 
                            id="feedback" 
                            cols={30} 
                            rows={10}
                            maxLength={150}
                            required
                            className="text-lg w-full p-1 border rounded shadow-sm bg-white my-1 transition ease-in-out focus:border-blue-500 focus:ring" 
                            placeholder="Escriba aqui sus observaciones sobre el cierre de caja y el monto de diferencia."
                        />
                        <div className="flex items-center justify-center">
                            <button className="w-full bg-third text-white rounded-md p-1">
                                Cerrar Caja
                            </button>
                        </div>
                    </form>
                </section>
            </section>
            <Toaster 
            dir="auto"
            visibleToasts={2}
            duration={1500}
            closeButton
            richColors
        />
        </main>
    )
}