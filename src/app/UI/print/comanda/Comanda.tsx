'use client';

import { useEffect } from 'react';
import './style.css'

export default function Comanda({ details_orders, productos, idTable, idOrder, create } : { details_orders : any, productos : any, idTable : any, idOrder : any, create : any}) {

    function handlePrint() {
        window.print();
    }

    useEffect(() => {
        handlePrint();
    }, [])

    return (
        <section className={`comanda ${ create } mb-3`}>
        <div className="flex flex-col">
            <h1 className="text-center text-lg font-bold">Comanda Generada</h1>
            <h2 className="text-center text-base">Comanda N°: #{idOrder} { idTable && `| Mesa: N° ${idTable}` }</h2>
        </div>
        <h2 className="text-center text-base font-semibold">Detalles</h2>
        <h2 className="text-center">Preparar en</h2>
        <h2 className="text-center text-base font-semibold">{create}</h2>
        <table className="min-w-full">
            <thead>
                <tr>
                <th className="p-2">Producto</th>
                <th className="p-2">Cantidad</th>
                </tr>
            </thead>
            <tbody>
                {details_orders.map((detail_order: any) => {
                const { id, orden_id, producto_id, cantidad } = detail_order;
                const product = productos.find((producto: any) => producto.id === producto_id);
                if (product.preparado_en === create) {
                    return (
                    <tr key={id}>
                        <td className="">{product.nombre}</td>
                        <td className="text-center">{cantidad}</td>
                    </tr>
                    );
                }
                return null;
                })}
            </tbody>
            <br  className='comanda fin'/>
        </table>
    </section>
    )
}