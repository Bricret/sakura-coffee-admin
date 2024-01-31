import dynamic from 'next/dynamic';
import { LatestInventorySkeleton } from "@/app/UI/Skeleton";
import { Suspense } from "react";

const DynamicTableInvoices = dynamic(() => import('@/app/UI/reportes/TableInvoices'), {
  loading: () => <LatestInventorySkeleton />,
});

export default function ReportsPage({ searchParams } : { searchParams?: {
    query?: string,
    page?: string,
    startDate?: string,
    endDate?: string,
    dataForPage?: string,
    } }) {

    const dataParamsInvoice = {
        itemsForPage : Number(searchParams?.dataForPage) || 5,
        query : searchParams?.query || "",
        currentPage : Number(searchParams?.page) || 1,
        startDate : searchParams?.startDate || "",
        endDate : searchParams?.endDate || ""
    }

    return (
    <main>
        <section className="mb-12">
            <h1 className="text-2xl font-semibold text-gray-600 mb-4">Facturas Totales</h1>
            <Suspense fallback={ <LatestInventorySkeleton /> }>
                <DynamicTableInvoices dataParams={dataParamsInvoice} />
            </Suspense>
        </section>
    </main>
    )
}
