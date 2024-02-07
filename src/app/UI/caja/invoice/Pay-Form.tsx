'use client';

import { Checkbox } from "@nextui-org/react";
import { useState } from "react";
import { Button } from "../../auth/button";
import { Toaster } from "sonner";
import { ErrorToast, SuccessToast } from "@/app/plugins/sonner";
import { createNewInvoice, createNewInvoiceByTable, getOrdersPendingByTable, updateInvoice, updateInvoiceByTable, updateOrderToFinish, updateOrderToFinishByTable } from "@/app/lib/actions";
import ChangeMoney from "./Change-Money";
import FormSectionInvoice from "./Form-Section-Invoice";
import { useRouter } from "next/navigation";
import { printInvoiceFunction } from "@/app/lib/PrintFunction";
import { HandleDivideInvoice } from "./HandleDivideInvoice";

// ubi = 1 -> caja | ubi = 2 -> mesa

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
                printInvoiceFunction(data.id, Order.id);
            }
        }
        if (ubi === 2) {
            const res = await createNewInvoiceByTable(Order, TypePay);
            if (res.success === true) {
                const { data } = res;
                setInvoice(data);
                printInvoiceFunction(data.id, Order.id);
            }
        }
    }

    const handleFinish = async () => {
        if (invoice === null) {
            return ErrorToast('No se ha generado la factura');
        }

        if ( propina === true ) {
            if (ubi === 1) {
                const res = await updateOrderToFinish(Order.id);
                res.success === true ? router.push('/dashboard/caja') : ErrorToast('No se pudo actualizar la orden');
            }
            if ( ubi === 2 ) {
                const res = await updateOrderToFinishByTable(Order.id, Order.mesa_id);
                res.success === false && ErrorToast('No se pudo actualizar la factura');
                const OrdersPending = await getOrdersPendingByTable(Order.mesa_id)
                if ( OrdersPending < 1 ) {
                    router.push('/dashboard/caja') 
                } else {
                    SuccessToast('Factura Finalizada Correctamente')
                }            
            }
        } else {
            const newTotal = invoice.total_C_ - invoice.propina_C_;
            if (ubi === 1) {
                const res = await updateInvoice(invoice.id, newTotal, Order.id);
                res.success === true ? router.push('/dashboard/caja') : ErrorToast('No se pudo actualizar la factura');
            }
            if ( ubi === 2 ) {
                const res = await updateInvoiceByTable(invoice.id, newTotal, Order.id, Order.mesa_id);
                res.success === false && ErrorToast('No se pudo actualizar la factura');
                const OrdersPending = await getOrdersPendingByTable(Order.mesa_id)
                if ( OrdersPending < 1 ) {
                    router.push('/dashboard/caja') 
                } else {
                    SuccessToast('Factura Finalizada Correctamente')
                }         
            }
        }
    }

    return (
        <>
        <div className="flex justify-between items-end px-2">
            <h1 className="text-2xl mb-2 mt-4 md:mt-0 font-semibold">Cambio</h1>
        {
            ubi === 2 && (
                <HandleDivideInvoice Order={Order}/>
            )
        }
        </div>

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
                {
                    invoice !== null ? (
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
                    ) : null
                }
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
