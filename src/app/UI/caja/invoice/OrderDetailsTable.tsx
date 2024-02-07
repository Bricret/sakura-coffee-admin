'use client'

import { useState } from 'react';
import { TableDivideInvoice } from "@/app/lib/data/Local-Data"
import { divideOrdenByTable, revalidatePage } from '@/app/lib/actions';
import { Toaster } from 'sonner';
import { ErrorToast, SuccessToast } from '@/app/plugins/sonner';

export default function OrderDetailsTable ({ detailsOrder, order } : { detailsOrder : any, order : any }) {

    const [selectedDetails, setSelectedDetails] = useState(new Set());

    const toggleSelection = (itemId: any) => {
        setSelectedDetails((prevSelectedDetails) => {
            const newSelectedDetails = new Set(prevSelectedDetails);
            if (newSelectedDetails.has(itemId)) {
                newSelectedDetails.delete(itemId);
            } else {
                newSelectedDetails.add(itemId);
            }
            return newSelectedDetails;
        });
    };

    const HandleDivideOrder = async (e : any) => {
        e.preventDefault()
        let selectedDetailsArray = Array.from(selectedDetails);
        if ( selectedDetailsArray.length === detailsOrder.length ) {
            return ErrorToast('No puedes dejar una orden vacia');
        }
        const DivideOrder = await divideOrdenByTable(order.id, selectedDetailsArray, order.mesa_id)
        if (DivideOrder.success === true) {
            revalidatePage(`/dashboard/caja/newOrder/${order.mesa_id}`)
            SuccessToast('Orden dividida correctamente');
        }
    }

    return (
        <section className="p-4 z-0 flex flex-col relative justify-between gap-4 overflow-auto rounded-large shadow-small border-2 border-black/40 w-full">
        <form>
            <table 
            className="min-w-full h-auto table-auto w-full mb-2"
            aria-label="Tabla de mesas"
            >
            <thead className=" bg-secundary">
                <tr className="h-10 rounded-full">
                {
                    TableDivideInvoice.map((item) => (
                        <th 
                            key={item.key}
                            className="px-4 py-2 text-white font-bold text-sm md:text-base first:rounded-l-xl last:rounded-r-xl text-center cursor-default"
                        >
                            {item.label}
                        </th>
                    ))
                }
                </tr>
            </thead>
            <tbody>
            {
                detailsOrder.map((item : any) => (
                    <tr 
                        key={item.id}
                        className="h-10 hover:bg-gray-100 border-b border-gray-200 py-4"
                    >
                        <td className="px-4 py-2 text-sm md:text-base text-center">
                            <input 
                                type="checkbox" 
                                checked={selectedDetails.has(item.id)}
                                onChange={() => toggleSelection(item.id)}
                                className="accent-secundary"
                            />
                        </td>
                        <td className="px-4 py-2 text-sm md:text-base text-center">{item.productos.nombre}</td>
                        <td className="px-4 py-2 text-sm md:text-base text-center">{item.cantidad}</td>
                    </tr>
                ))
            }

            </tbody>
            </table>
            <div className='flex items-end justify-end'>
                <button 
                    className="rounded-lg text-center h-10 px-4 py-2 mb-2 bg-third text-white font-bold hover:bg-secundary"
                    onClick={(e) => HandleDivideOrder(e)}
                >
                    Dividir
                </button>
            </div>
        </form>
        <Toaster 
            dir="auto"
            visibleToasts={2}
            duration={1500}
            closeButton
            richColors
        />
    </section>
    )
}