import dynamic from "next/dynamic";
import { LatestInventorySkeleton } from "../UI/Skeleton";
import NavBar from "../UI/dashboard/nav-bar";
import { Suspense } from "react";

const DynamicHeaderDashboard = dynamic(() => import('../UI/dashboard/HeaderDashboard'), {
    loading: () => <LatestInventorySkeleton />,
  });

const DynamicGraphicsDashboard = dynamic(() => import('../UI/dashboard/GraphicDashboard'), {
    loading: () => <LatestInventorySkeleton />
});

const DynamicFooterDashboard = dynamic(() => import('../UI/dashboard/FooterDashboard'), {
    loading: () => <LatestInventorySkeleton />
});
  

export default function DashboardPage() {
    return (
        <>
        <NavBar title="Bienvenid@ de nuevo " site />
        <Suspense fallback={<LatestInventorySkeleton />}>
            <DynamicHeaderDashboard />
        </Suspense>
        <main>
            <Suspense fallback={<LatestInventorySkeleton />}>
                <DynamicGraphicsDashboard />
            </Suspense>
        </main>
            <Suspense fallback={<LatestInventorySkeleton />}>
                <DynamicFooterDashboard />
            </Suspense>
        </>
    )
}