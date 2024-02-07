'use client'

import { getDetailOrderByTable } from "@/app/lib/actions";
import { useState } from "react"
import ModalDivideInvoice from "./ModalDivideInvoice";


export const HandleDivideInvoice = ({Order} : any) => {

    const [DetailOrders, setDetailOrders] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const onOpen  = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    const handleDivideInvoice = async () => {
        const DetailsOrder = await getDetailOrderByTable(Order.id);
        setDetailOrders(DetailsOrder);
        onOpen()
    }

  return (
    <>
    <button 
        className="rounded-lg text-center h-10 px-4 py-2 mb-2 bg-third text-white font-bold hover:bg-secundary"
        onClick={handleDivideInvoice}
    >
        Dividir Cuenta
    </button>
    <ModalDivideInvoice detailsOrder={DetailOrders} order={Order} isOpen={isOpen} onClose={onClose} />
    </>
  )
}
