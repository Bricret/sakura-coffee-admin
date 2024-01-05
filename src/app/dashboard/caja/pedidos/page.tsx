import { InventorySkeleton } from "@/app/UI/Skeleton";
import TableOrderTo from "@/app/UI/caja/pedidos/Table-OrdersTo";
import InfoTable from "@/app/UI/inventario/Info-Table";
import Search from "@/app/UI/inventario/Search";
import RightButton from "@/app/UI/inventario/right-button";
import { FetchOrdersTo } from "@/app/lib/data";
import { Suspense } from "react";


export default async function PedidosPage({ searchParams } : { searchParams?: {
    query?: string,
    dataForPage?: string,
    page?: string
} }) {

    const orders = await FetchOrdersTo();
    const itemsForPage = Number(searchParams?.dataForPage) || 5;
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    return (
    <>
    <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between gap-3 items-center md:items-end">
            <Search placeholder="Busca por usuario..."/>
            <RightButton route={"/dashboard/caja/pedidos/NewOrderTo"} title={"Nuevo Pedido"} />
        </div>
        <InfoTable allProducts={ orders } type="pedidos"/>
    </div>
    <main 
    className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small w-full"
    >
        <Suspense fallback={ <InventorySkeleton /> }>
            <TableOrderTo itemsForPage={ itemsForPage } query={ query } currentPage={ currentPage } />
        </Suspense>
    </main>
    </>
    )
}