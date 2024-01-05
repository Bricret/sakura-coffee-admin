import { fonts } from "@/app/UI/Fonts";
import { InventorySkeleton } from "@/app/UI/Skeleton";
import InputProduct from "@/app/UI/caja/NewOrderByTable/Input-Product";
import Invoice from "@/app/UI/caja/invoice/Invoice";
import { createNewOrder } from "@/app/lib/actions";
import { FetchAllProductAvailability } from "@/app/lib/data";
import { Suspense } from "react";


export default async function NewOrderPage() {

    const products = await FetchAllProductAvailability();
    const Order = await createNewOrder();
    const { data } = Order;

    return (
    <>
        <header className="mb-8">
        <h1 
            className={`${fonts.merriweather.className} text-4xl font-bold mb-4`}>
                Crear <span className="text-secundary">Orden</span>
        </h1>
            <InputProduct products={ products } idOrder={ data.id } ubi={ 1 }/>
        </header>
        <main>
            <Suspense fallback={<InventorySkeleton />}>
                <Invoice Orders={ data } ubi={ 1 } product={ products }/>
            </Suspense>
        </main>
    </>
    )
}