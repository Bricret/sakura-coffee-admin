import { FetchAllProductAvailability, FetchOrdersByIdTable } from "@/app/lib/data";
import TableDetailOrder from "../NewOrderByTable/Table-detail-order";
import PayForm from "./Pay-Form";


export default async function Invoice({ idTable } : { idTable : string} ) {

    const Order = await FetchOrdersByIdTable(idTable);
    const products = await FetchAllProductAvailability();

    return (
    <main className="md:flex md:flex-row flex-col">
        <article className="md:w-2/3 w-full">
            <h1 className="text-2xl mb-2">Detalle de Orden</h1>
            <TableDetailOrder idTable={ idTable } idOrder={Order.id} product={products} />
        </article>
        <article className="flex flex-col ml-0 md:ml-4 md:w-2/5 w-full">
            <PayForm Order={Order} />
        </article>
    </main>
    )
}