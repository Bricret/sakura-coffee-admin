import NavBar from "@/app/UI/dashboard/nav-bar";
import TableInventory from "@/app/UI/inventario/Table-Inventory";
import TopContent from "@/app/UI/inventario/top-content";
import { FetchFilteredInventory, FetchInventoryPageCount } from "@/app/lib/data";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Inventario | Sakura Coffee Shop',
  };

export default async function InventoryPage({ searchParams } : { searchParams?: {
    query?: string,
    dataForPage?: string,
    page?: string
} }) {

    const itemsForPage = Number(searchParams?.dataForPage) || 10;
    const query = searchParams?.query || "";
    const currentPage = Number(searchParams?.page) || 1;

    const products = await FetchFilteredInventory(query, itemsForPage, currentPage);
    const TotalPage = await FetchInventoryPageCount(itemsForPage);

    return (
        <>
        <NavBar title={"Catalogo"}/>
        <TopContent />
        <TableInventory products={ products } TotalPage={ TotalPage }/>
        </>
    )
}