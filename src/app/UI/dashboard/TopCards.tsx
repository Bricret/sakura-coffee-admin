'use client'

import useUserStore from "@/app/context/store";
import InformationCards from "./InformationCards";


export default function TopCards({ InvoiceForDay, allOrdersTo, InvoiceForMonth, allInvoice } : any) {

    const { user } = useUserStore();

    return (
    <>
    {
        user.role === 'Mesero' ? (
            <header className="flex flex-wrap items-center gap-6 md:flex-nowrap gap-x-6 mb-6 w-full">
                <InformationCards title="Facturas del dia" style1="border-b-blue-500" style2="bg-blue-100" data={InvoiceForDay || 0}  />
                <InformationCards title="Total Pedidos" style1="border-b-green-500" style2="bg-green-100" data={allOrdersTo || 0}  />
            </header>
        ) : (
            <header className="flex flex-wrap items-center gap-6 md:flex-nowrap gap-x-6 mb-6 w-full">
                <InformationCards title="Facturas del dia" style1="border-b-blue-500" style2="bg-blue-100" data={InvoiceForDay || 0}  />
                <InformationCards title="Facturas x mes" style1="border-b-red-500" style2="bg-red-100" data={InvoiceForMonth || 0}  />
                <InformationCards title="Facturas Totales" style1="border-b-orange-500" style2="bg-orange-100" data={allInvoice || 0}  />
                <InformationCards title="Total Pedidos" style1="border-b-green-500" style2="bg-green-100" data={allOrdersTo || 0}  />
            </header>
        )
    }
    </>
    )
}