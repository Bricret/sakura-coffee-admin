'use client'

import { FetchTipOfDate } from "@/app/lib/actions";
import { TipIcons } from "@/app/plugins/Icons"
import { useState } from "react"
import ModalTip from "./ModalTip";

export default function PropinaBoton({ startDate, endDate } : { startDate : string, endDate : string }) {

    const [Tip, setTip] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const onOpen  = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);

    const handleTip = async () => {
        const AmountTip = await FetchTipOfDate(startDate, endDate);
        setTip(AmountTip._sum.propina_C_);
        onOpen()
    }

    return (
    <>
    <button 
        className="bg-secundary hover:bg-secundary/80 hover:scale-110 transition text-white py-4 md:py-3 gap-x-2 px-4 rounded-xl flex justify-between items-center"
        onClick={ handleTip }
    >
        <TipIcons className='size-10' />
        <span className="hidden md:block">Propina</span>
    </button>
    <ModalTip propina={Tip} isOpen={isOpen} onClose={onClose} startDate={startDate} endDate={endDate} />
    </>
    )
}