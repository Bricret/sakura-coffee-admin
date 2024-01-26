'use client'

import { printInvoiceFunction } from "@/app/lib/PrintFunction";
import { EyeIcon, Icons } from "@/app/plugins/Icons";
import { Tooltip } from "@nextui-org/react";

const { PrinterIcon } = Icons;

export default function ActionInvoice({OrderId, InvoiceId} : {OrderId : number, InvoiceId : number }) {

    const PrinterInvoice = () => {
        printInvoiceFunction(InvoiceId, OrderId);
    }

    return (
        <div className="relative flex items-center justify-evenly gap-2">
            <Tooltip closeDelay={2} delay={500} content="Mas Informacion">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
            </span>
            </Tooltip>
            <Tooltip color="success" closeDelay={2} classNames={{content: "text-white"}} delay={500} content="Imprimir Factura">
            <span onClick={PrinterInvoice} className="text-lg text-success-500 cursor-pointer active:opacity-50">
                <PrinterIcon />
            </span>
            </Tooltip>
        </div>
    )
}