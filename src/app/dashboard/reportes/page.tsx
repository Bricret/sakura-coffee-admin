import { InventorySkeleton } from "@/app/UI/Skeleton";
import NavBar from "@/app/UI/dashboard/nav-bar";
import TableInvoices from "@/app/UI/reportes/TableInvoices";
import { Metadata } from "next"
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Reportes | Sakura Coffee Shop',
  };

export default function ReportsPage({ searchParams } : { searchParams?: {
    query?: string,
    dataForPage?: string,
    page?: string,
    startDate?: string,
    endDate?: string
} }) {

    const dataParams = {
        itemsForPage : Number(searchParams?.dataForPage) || 5,
        query : searchParams?.query || "",
        currentPage : Number(searchParams?.page) || 1,
        startDate : searchParams?.startDate || "",
        endDate : searchParams?.endDate || ""
    }

    return (
    <>
        <NavBar title={"Reportes de Movimiento"}/>
        <h1 className="text-2xl font-semibold text-gray-600 mb-4">Facturas Totales</h1>
        <main>
            <Suspense fallback={ <InventorySkeleton /> }>
                <TableInvoices dataParams={dataParams} />
            </Suspense>
        </main>
    </>
    )
}