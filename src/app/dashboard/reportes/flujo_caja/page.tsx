import { LatestInventorySkeleton } from '@/app/UI/Skeleton';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';


const DynamicTableFlowCash = dynamic(() => import('@/app/UI/reportes/TableFlowCash'), {
    loading: () => <LatestInventorySkeleton />,
});

export default function FlujoPage({ searchParams } : { searchParams?: {
    dataForPage?: string,
    pageFlow?: string
    startDateFlow?: string,
    endDateFlow?: string,

}}) {

    const dataParamsFlowCash = {
        itemsForPage : Number(searchParams?.dataForPage) || 5,
        currentPage : Number(searchParams?.pageFlow) || 1,
        startDate : searchParams?.startDateFlow || "",
        endDate : searchParams?.endDateFlow || ""
    }


    return (
        <section>
            <h1 className="text-2xl font-semibold text-gray-600 mb-4 ">Flujos de Caja</h1>
            <Suspense fallback={ <LatestInventorySkeleton /> }>
                <DynamicTableFlowCash dataParams={dataParamsFlowCash} />
            </Suspense>
        </section>
    )
}