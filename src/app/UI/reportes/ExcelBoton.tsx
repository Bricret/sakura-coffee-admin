'use client'

import { FetchFilteredAllInvoice } from "@/app/lib/actions";
import { ExcelToInvoice } from "@/app/lib/exportExcel/ExcelToInvoices";
import { ExcelIcon } from "@/app/plugins/Icons";


export default function ExcelBoton({ query, startDate, endDate } : { query : string, startDate : string, endDate : string }) {

    const  GenerateExcel = async () => {
        const invoices = await FetchFilteredAllInvoice( query, startDate, endDate )
        ExcelToInvoice( invoices )
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