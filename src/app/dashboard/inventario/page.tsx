import NavBar from "@/app/UI/dashboard/nav-bar";
import TableInventory from "@/app/UI/inventario/Table-Inventory";
import TopContent from "@/app/UI/inventario/top-content";
import { FetchFilteredInventory } from "@/app/lib/data";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Inventario | Sakura Coffee Shop',
  };

export default async function InventoryPage({ searchParams } : { searchParams?: {
    query?: string,
    dataForPage?: string
} }) {

    const itemsForPage = Number(searchParams?.dataForPage) || 5;
    const query = searchParams?.query || "";
    const currentPage = 1;

    const products = await FetchFilteredInventory(query, itemsForPage, currentPage);
    console.log('antes del props', products);

    return (
        <>
        <NavBar title={"Catalogo"}/>
        <TopContent />
        <TableInventory products={ products }/>
        </>
    )
}