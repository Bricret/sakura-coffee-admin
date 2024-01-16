'use client';

import { updateCashFlow } from "@/app/lib/actions";
import { PropinaInvoice, TotalInvoice, calcularTotalMonto, handleInputChangeMontos } from "@/app/lib/utils";
import { ErrorToast } from "@/app/plugins/sonner";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import NominationTable from "./NominationTable";
import FormToCloseCash from "./FormToCloseCash";


export default function NominationForms({ Cashflow, Invoice } : { Cashflow: any, Invoice: any }) {

    const [montos, setMontos] = useState<Record<string, number>>({});
    const [totalMonto, setTotalMonto] = useState<number>(Cashflow.monto_inicial_C_);

    const absolutetotalinvoice = TotalInvoice(Invoice) + Cashflow.monto_inicial_C_;
    const allInvoiceTarjeta = Invoice?.filter((item: any) => item.metodo_pago === 'tarjeta');
    const diferencia = totalMonto - absolutetotalinvoice;

    useEffect(() => {
        calcularTotalMonto(montos, Cashflow.monto_inicial_C_, setTotalMonto);
    }, [montos, Cashflow.monto_inicial_C_]);

    async function clientAction( formData: FormData ) {
        const res = await updateCashFlow(formData, diferencia, Cashflow.id, absolutetotalinvoice);
         res?.success === false && ErrorToast(res.message);
    }
    return (
        <main className="flex flex-row gap-4 mt-6 md:mt-10">
            <NominationTable montos={montos} setMontos={setMontos} />
            <FormToCloseCash 
                allInvoiceTarjeta={allInvoiceTarjeta} 
                setMontos={setMontos} 
                totalMonto={totalMonto} 
                absolutetotalinvoice={absolutetotalinvoice} 
                diferencia={diferencia} 
                propinainvoice={PropinaInvoice( Invoice )} 
                clientAction={clientAction} 
            />
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