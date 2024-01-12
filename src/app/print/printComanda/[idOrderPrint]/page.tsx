import { FetchAllInventory, FetchDetailOrderByOrderId } from "@/app/lib/data";

export default async function PrintComandaPage({ params } : { params : any }) {

    const { idOrderPrint } = params;

    const details_orders = await FetchDetailOrderByOrderId(Number(idOrderPrint));
    const productos = await FetchAllInventory();

    return (
        <div>
            <h1>printComandaPage {idOrderPrint}</h1>
        </div>
    )
}