import { fonts } from "@/app/UI/Fonts";
import { InventorySkeleton } from "@/app/UI/Skeleton";
import Invoice from "@/app/UI/caja/invoice/Invoice";
import { Suspense } from "react";


export default async function facturePage({params : {idTable} } : {params : {idTable : string}}) {

    return (
    <>
        <h1 
            className={`${fonts.merriweather.className} text-4xl font-bold mb-4`}>
                Facturacion de <span className="text-secundary">Orden</span>
        </h1>
        <Suspense fallback={<InventorySkeleton />}>
            <Invoice idTable={idTable} ubi={2} />
        </Suspense>
    </>
    )
}