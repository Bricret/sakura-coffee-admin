'use client';

import { Checkbox } from "@nextui-org/react";
import { useState } from "react";
import { Button } from "../../auth/button";
import { Toaster } from "sonner";
import { ErrorToast } from "@/app/plugins/sonner";
import { createNewInvoice, createNewInvoiceByTable } from "@/app/lib/actions";
import ChangeMoney from "./Change-Money";
import FormSectionInvoice from "./Form-Section-Invoice";
import { useRouter } from "next/navigation";

const dir = process.env.NEXT_PUBLIC_URL;

export default function PayForm({ Order, ubi } : { Order : any, ubi : number }) {
    const [isDollar, setIsDollar] = useState(false);
    const [propina, setPropina] = useState(false);
    const [invoice, setInvoice] = useState<any>(null);
    const router = useRouter();

    async function ClientAction( formData : FormData ) {
        const TypePay = formData.get('tipo')
        if (TypePay === null) {
            return ErrorToast('Seleccione un metodo de pago');
        }
        if (ubi === 1) {
            const res = await createNewInvoice(Order, TypePay);
            
            if (res.success === true) {
                const { data } = res;
                setInvoice(data);
                const orderIdAndTableId = `${data.id.toString()}-${Order.id.toString()}`
                const url = `${dir}print/printInvoice/${orderIdAndTableId}`;
                const windowFeatures = 'noopener,noreferrer';
                window.open(url, '_blank', windowFeatures);
            }
        }
        if (ubi === 2) {
            const res = await createNewInvoiceByTable(Order, TypePay);
            if (res.success === true) {
                const { data } = res;
                setInvoice(data);
                const orderIdAndTableId = `${data.id.toString()}-${Order.id.toString()}`
                const url = `${dir}print/printInvoice/${orderIdAndTableId}`;
                const windowFeatures = 'noopener,noreferrer';
                window.open(url, '_blank', windowFeatures);
            }
        }
    }

    const handleFinish = async () => {
        if ( propina === true ) {
            console.log('Hay propina');
            console.log('Finish', invoice, propina);
        } else {
            console.log('No hay propina');
        }
    }

    return (
        <>
        <h1 className="text-2xl mb-2 mt-4 md:mt-0">Cambio</h1>
        <div className="items-center justify-center h-full w-full bg-white rounded-lg shadow-large px-4 text-lg text-zinc-600 py-4">
            <ChangeMoney isDollar={ isDollar } setIsDollar={ setIsDollar }/>
            <form action={ClientAction}>
                <FormSectionInvoice isDollar={ isDollar } Order={ Order }/>
                <div className="flex flex-col">
                    <h6 className="text-secundary">Metodo de pago</h6>
                    <div className="flex flex-row gap-4 pb-2">
                        <Checkbox 
                            id="tipo"
                            name="tipo"
                            value="efectivo"
                            required
                        >
                            Efectivo
                        </Checkbox>
                        <Checkbox
                            id="tipo"
                            name="tipo"
                            value="tarjeta"
                        >
                            Tarjeta
                        </Checkbox>
                        <Checkbox
                            id="tipo"
                            name="tipo"
                            value="transferencia"
                        >
                            Transferencia
                        </Checkbox>
                    </div>
                    <div className="mb-2">
                        <Checkbox
                            id="propina"
                            name="propina"
                            value="propina"
                            onChange={() => setPropina(!propina)}
                        >
                            Propina
                        </Checkbox>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="w-1/2">
                        <Button>
                            Imprimir
                        </Button>
                    </div>
                    <button 
                        className="p-1 rounded-md bg-green-500 text-center text-white font-semibold w-1/2"
                        onClick={handleFinish}
                        type="button"
                    >
                        Terminar
                    </button>
                </div>
                <Toaster
                    dir="auto"
                    visibleToasts={2}
                    duration={1500}
                    closeButton
                    richColors
                />
            </form>
        </div>
        </>
    )
}
