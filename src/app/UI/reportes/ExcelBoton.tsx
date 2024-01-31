'use client'

import { FetchFilteredAllCashFlow, FetchFilteredAllInvoice } from "@/app/lib/actions";
import { CreateExcel } from "@/app/lib/exportExcel/ExcelToInvoices";
import { ExcelIcon } from "@/app/plugins/Icons";


export default function ExcelBoton({ query, startDate, endDate, Invoice = false } : { query : string, startDate : string, endDate : string, Invoice? : boolean }) {

    const  GenerateExcel = async () => {
        if(Invoice) {
            const from = 'Facturas'
            const invoices = await FetchFilteredAllInvoice( query, startDate, endDate )
            CreateExcel( invoices, from, startDate, endDate );
        } else {
            const CashFlow = await FetchFilteredAllCashFlow( startDate, endDate );
            const from = 'Flujos de caja'
            CreateExcel( CashFlow, from, startDate, endDate )
        }

    }

    return (
        <button 
            className="bg-green-900 hover:bg-green-800 hover:scale-110 transition text-white py-4 md:py-3 gap-x-2 px-4 rounded-xl flex justify-between items-center"
            onClick={ GenerateExcel }
        >
            <ExcelIcon className='size-10' />
            <span className="hidden md:block">Exportar a Excel</span>
        </button>
    )
}