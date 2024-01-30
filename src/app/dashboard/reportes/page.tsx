import dynamic from 'next/dynamic';
import { LatestInventorySkeleton } from "@/app/UI/Skeleton";
import NavBar from "@/app/UI/dashboard/nav-bar";
import { Metadata } from "next"
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Reportes | Sakura Coffee Shop',
  };

const DynamicTableInvoices = dynamic(() => import('@/app/UI/reportes/TableInvoices'), {
  loading: () => <LatestInventorySkeleton />,
});

const DynamicTableFlowCash = dynamic(() => import('@/app/UI/reportes/TableFlowCash'), {
  loading: () => <LatestInventorySkeleton />,
});

export default function ReportsPage({ searchParams } : { searchParams?: {
    query?: string,
    dataForPage?: string,
    page?: string,
    startDate?: string,
    endDate?: string,
    startDateFlow?: string,
    endDateFlow?: string,
    pageFlow?: string

} }) {

    const dataParamsInvoice = {
        itemsForPage : Number(searchParams?.dataForPage) || 5,
        query : searchParams?.query || "",
        currentPage : Number(searchParams?.page) || 1,
        startDate : searchParams?.startDate || "",
        endDate : searchParams?.endDate || ""
    }

    const dataParamsFlowCash = {
        itemsForPage : Number(searchParams?.dataForPage) || 5,
        currentPage : Number(searchParams?.pageFlow) || 1,
        startDate : searchParams?.startDateFlow || "",
        endDate : searchParams?.endDateFlow || ""
    }

    return (
    <>
        <NavBar title={"Reportes de Movimiento"}/>
        <main>
            <section className="mb-12">
                <h1 className="text-2xl font-semibold text-gray-600 mb-4">Facturas Totales</h1>
                <Suspense fallback={ <LatestInventorySkeleton /> }>
                    <DynamicTableInvoices dataParams={dataParamsInvoice} />
                </Suspense>
            </section>

            <section>
                <hr className="border-t-2 border-t-secundary/30 pb-4" />
                <h1 className="text-2xl font-semibold text-gray-600 mb-4 ">Flujos de Caja</h1>
                <Suspense fallback={ <LatestInventorySkeleton /> }>
                    <DynamicTableFlowCash dataParams={dataParamsFlowCash} />
                </Suspense>
            </section>
        </main>
    </>
    )
}
