import AgreeProduct from "@/app/UI/caja/NewOrderByTable/Agree-Product";
import { createNewOrderByTable } from "@/app/lib/actions";
import { FetchOrdersByIdTable } from "@/app/lib/data";


export default async function NewOrderTablePage({ params } : any) {

    const { idTable, action } = params;
    let Order = null;
    let idOrder = null;
    (action === 'create') ? Order = await createNewOrderByTable(idTable) : null;
    (action === 'view') ? Order = await FetchOrdersByIdTable(idTable) : null;
    const { data } = Order;
    (action === 'view') ? idOrder = Order.id : idOrder = data.id;
    return (
        <>
            <main className="mt-4">
                <AgreeProduct idTable={ idTable } idOrder={ idOrder }/>
            </main>
        </>
    )
}