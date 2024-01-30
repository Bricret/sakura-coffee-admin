import { LatestInventorySkeleton } from "@/app/UI/Skeleton";
import NavBar from "@/app/UI/dashboard/nav-bar";
import TableFlowCash from "@/app/UI/reportes/TableFlowCash";
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
        <main>
            <section className="mb-12">
                <h1 className="text-2xl font-semibold text-gray-600 mb-4">Facturas Totales</h1>
                <Suspense fallback={ <LatestInventorySkeleton /> }>
                    <TableInvoices dataParams={dataParams} />
                </Suspense>
            </section>

            <section>
                <hr className="border-t-2 border-t-secundary/30 pb-4" />
                <h1 className="text-2xl font-semibold text-gray-600 mb-4 ">Flujos de Caja</h1>
                <Suspense fallback={ <LatestInventorySkeleton /> }>
                    <TableFlowCash dataParams={dataParams} />
                </Suspense>
            </section>
        </main>
    </>
    )
}