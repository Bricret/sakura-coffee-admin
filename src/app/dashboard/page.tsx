import dynamic from "next/dynamic";
import { CardHeaderDashboard, LatestInventorySkeleton, PrincipalNavbarSkeleton } from "../UI/Skeleton";
import NavBar from "../UI/dashboard/nav-bar";
import { Suspense } from "react";

const DynamicHeaderDashboard = dynamic(() => import('../UI/dashboard/HeaderDashboard'), {
    loading: () => <CardHeaderDashboard />,
  });

const DynamicGraphicsDashboard = dynamic(() => import('../UI/dashboard/GraphicDashboard'), {
    loading: () => <CardHeaderDashboard />
});

const DynamicFooterDashboard = dynamic(() => import('../UI/dashboard/FooterDashboard'), {
    loading: () => <PrincipalNavbarSkeleton />
});
  

export default function DashboardPage() {
    return (
        <>
        <NavBar title="Bienvenid@ de nuevo " site />
        <Suspense fallback={<CardHeaderDashboard />}>
            <DynamicHeaderDashboard />
        </Suspense>
        <main>
            <Suspense fallback={<CardHeaderDashboard />}>
                <DynamicGraphicsDashboard />
            </Suspense>
        </main>
            <Suspense fallback={<PrincipalNavbarSkeleton />}>
                <DynamicFooterDashboard />
            </Suspense>
        </>
    )
}