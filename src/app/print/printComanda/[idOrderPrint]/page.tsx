import TableComanda from "@/app/UI/print/comanda/Table-Comanda";
import { FetchAllInventory, FetchDetailOrderByOrderId } from "@/app/lib/data";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Impresion | Sakura Coffee Shop',
  };

export default async function PrintComandaBarPage({ params } : { params : any }) {

    const { idOrderPrint } = params;
    const idOrder = idOrderPrint.split('-')[0];
    const idTable = idOrderPrint.split('-')[1];

    const details_orders = await FetchDetailOrderByOrderId(Number(idOrder));
    const productos = await FetchAllInventory();

    return (
        <div className="flex items-center justify-center">
            <TableComanda details_orders={details_orders} productos={productos} idTable={ idTable } idOrder={idOrder} />
        </div>
    )
}