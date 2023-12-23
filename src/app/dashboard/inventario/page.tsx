import { LatestInvoicesSkeleton } from "@/app/UI/Skeleton";
import NavBar from "@/app/UI/dashboard/nav-bar";
import Inventory from "@/app/UI/inventario/Inventory";
import TopContent from "@/app/UI/inventario/top-content";
import { Metadata } from "next"
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Inventario | Sakura Coffee Shop',
  };

export default async function InventoryPage({ searchParams } : { searchParams?: {
    query?: string,
    dataForPage?: string,
    page?: string
} }) {

    const itemsForPage = Number(searchParams?.dataForPage) || 5;
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;


    return (
        <>
        <NavBar title={"Catalogo"}/>
        <Suspense fallback={<LatestInvoicesSkeleton />}>
            <TopContent />
            <Inventory itemsForPage={ itemsForPage } query={ query } currentPage={ currentPage } />
        </Suspense>
        </>
    )
}