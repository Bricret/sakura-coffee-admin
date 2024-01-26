'use client'


import Comanda from "./Comanda";

export default function TableComanda({ details_orders, productos, idTable, idOrder } : { details_orders : any, productos : any, idTable : any, idOrder : any }) {

    // Verificar si hay algún producto que se prepare en la barra
    const hasBarraProducts = details_orders.some((detail_order: any) => {
        const product = productos.find((producto: any) => producto.id === detail_order.producto_id);
        return product.preparado_en === 'barra';
    });
 
    // Verificar si hay algún producto que se prepare en la cocina
    const hasCocinaProducts = details_orders.some((detail_order: any) => {
        const product = productos.find((producto: any) => producto.id === detail_order.producto_id);
        return product.preparado_en === 'cocina';
    });

    return (
    <main className="flex flex-col">
        {hasCocinaProducts && (
            <Comanda details_orders={details_orders} productos={productos} idTable={ idTable } idOrder={idOrder} create="cocina" />
        )}
        {hasBarraProducts && (
            <Comanda details_orders={details_orders} productos={productos} idTable={ idTable } idOrder={idOrder} create="barra" />
        )}
    </main>
    )
}