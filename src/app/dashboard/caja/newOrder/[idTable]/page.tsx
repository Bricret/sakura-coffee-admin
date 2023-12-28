import AgreeProduct from "@/app/UI/caja/NewOrderByTable/Agree-Product";
import { createNewOrder } from "@/app/lib/actions";


export default async function NewOrderTablePage({ params } : any) {

    const { idTable } = params;

    const { data } = await createNewOrder(idTable);
    const idOrder =  data?.id.toString();

    return (
        <>
            <main className="mt-4">
                <AgreeProduct idTable={ idTable } idOrder={ idOrder }/>
            </main>
        </>
    )
}