import { allOrderDetailsById } from "@/app/lib/actions";
import Comanda from "./Comanda";

export default async function TableComanda({ details_orders, productos, idTable, idOrder } : { details_orders : any, productos : any, idTable : any, idOrder : any }) {

    let detailsOrder = details_orders

    if (details_orders.length === 0) {
        detailsOrder = await allOrderDetailsById(idOrder);
    }
    
    // Verificar si hay algún producto que se prepare en la barra
    const hasBarraProducts = detailsOrder.some((detail_order: any) => {
        const product = productos.find((producto: any) => producto.id === detail_order.producto_id);
        return product.preparado_en === 'barra';
    });
 
    // Verificar si hay algún producto que se prepare en la cocina
    const hasCocinaProducts = detailsOrder.some((detail_order: any) => {
        const product = productos.find((producto: any) => producto.id === detail_order.producto_id);
        return product.preparado_en === 'cocina';
    });

    return (
    <main className="flex flex-col">
        {hasCocinaProducts && (
            <Comanda details_orders={detailsOrder} productos={productos} idTable={ idTable } idOrder={idOrder} create="cocina" />
        )}
        {hasBarraProducts && (
            <Comanda details_orders={detailsOrder} productos={productos} idTable={ idTable } idOrder={idOrder} create="barra" />
        )}
    </main>
    )
}