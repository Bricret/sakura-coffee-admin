import AgreeProduct from "@/app/UI/caja/NewOrderByTable/AgreeProduct";
import { createNewOrder } from "@/app/lib/actions";


export default async function NewOrderTablePage({ params } : any) {

    const { idTable } = params;

    const CreateOrder = await createNewOrder(idTable);
    console.log(CreateOrder);

    return (
        <header className="mt-4">
            <AgreeProduct />       
        </header>
    )
}