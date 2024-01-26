'use client'

import { printInvoiceFunction } from "@/app/lib/PrintFunction";
import { EyeIcon, Icons } from "@/app/plugins/Icons";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
import ModalViewInvoice from "./ModalViewInvoice";

const { PrinterIcon } = Icons;

export default function ActionInvoice({Invoice} : {Invoice : any }) {

    const [isOpen, setIsOpen] = useState(false);
    const onOpen  = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);


    const PrinterInvoice = () => {
        printInvoiceFunction(Invoice.id, Invoice.orden_id);
    }

    return (
        <div className="relative flex items-center justify-evenly gap-2">
            <Tooltip closeDelay={2} delay={500} content="Mas Informacion">
            <span onClick={onOpen} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
            </span>
            </Tooltip>
            <Tooltip color="success" closeDelay={2} classNames={{content: "text-white"}} delay={500} content="Imprimir Factura">
            <span onClick={PrinterInvoice} className="text-lg text-success-500 cursor-pointer active:opacity-50">
                <PrinterIcon />
            </span>
            </Tooltip>
            <ModalViewInvoice isOpen={isOpen} onClose={onClose} Invoice={Invoice} />
        </div>
    )
}