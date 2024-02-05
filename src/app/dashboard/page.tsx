import dynamic from "next/dynamic";
import { FooterInfoCardsDashboardSkeleton, GraphicDashboardSkeleton, HeaderInfoCardsDashboardSkeleton } from "../UI/Skeleton";
import NavBar from "../UI/dashboard/nav-bar";
import { Suspense } from "react";

const DynamicHeaderDashboard = dynamic(() => import('../UI/dashboard/HeaderDashboard'), {
    loading: () => <HeaderInfoCardsDashboardSkeleton />,
  });

const DynamicGraphicsDashboard = dynamic(() => import('../UI/dashboard/GraphicDashboard'), {
    loading: () => <GraphicDashboardSkeleton />
});

const DynamicFooterDashboard = dynamic(() => import('../UI/dashboard/FooterDashboard'), {
    loading: () => <FooterInfoCardsDashboardSkeleton />
});
  

export default function DashboardPage() {
    return (
        <>
        <NavBar title="Bienvenid@ de nuevo " site />
        <Suspense fallback={<HeaderInfoCardsDashboardSkeleton />}>
            <DynamicHeaderDashboard />
        </Suspense>
        <main>
            <Suspense fallback={<GraphicDashboardSkeleton />}>
                <DynamicGraphicsDashboard />
            </Suspense>
        </main>
            <Suspense fallback={<FooterInfoCardsDashboardSkeleton />}>
                <DynamicFooterDashboard />
            </Suspense>
        </>
    )
}