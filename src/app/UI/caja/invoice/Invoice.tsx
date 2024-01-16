import { FetchAllProductAvailability, FetchOrdersByIdTable } from "@/app/lib/data";
import TableDetailOrder from "../NewOrderByTable/Table-detail-order";
import PayForm from "./Pay-Form";


export default async function Invoice({ idTable, ubi, product, Orders } : { idTable? : string, ubi: any, product? : any, Orders?: any } ) {

    let Order = Orders;
    let products = product;
    let id = Orders?.id;
    let edit = true;
    (ubi === 2) ? Order = await FetchOrdersByIdTable(idTable) : null;
    (ubi === 2) ? products = await FetchAllProductAvailability() : null;
    (ubi === 2) ? id = Order?.id : null;
    (ubi === 2) ? edit = false : null;

    return (
    <main className="md:flex md:flex-row flex-col">
        <article className="md:w-2/3 w-full">
            <h1 className="text-2xl mb-2">Detalle de Orden</h1>
            <TableDetailOrder idTable={ idTable } idOrder={ id } product={products} edit={edit} ubi={ubi} />
        </article>
        <article className="flex flex-col ml-0 md:ml-4 md:w-2/5 w-full">
            <PayForm Order={Order} ubi={ ubi }/>
        </article>
    </main>
    )
}