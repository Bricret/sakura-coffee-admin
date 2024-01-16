'use client'

import { useState } from "react";
import OpenCajaModal from "./OpenCaja-Modal";

export default function ActiveCajaForm({ caja } : { caja: any }) {

    const [open, setOpen] = useState(false);
    const onClick = () => setOpen(!open);

    return (
    <>
    <h1 className="text-3xl text-red-500 mb-4 font-semibold cursor-default">Caja Cerrada</h1>
    <button 
        onClick={onClick}
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 w-full text-lg font-semibold text-center cursor-pointer"
    >
        Abrir Caja
    </button>
    <OpenCajaModal isOpen={open} onClose={onClick} caja={caja} />
    </>
    )
}