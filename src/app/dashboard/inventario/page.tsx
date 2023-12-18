import NavBar from "@/app/UI/dashboard/nav-bar";
import TableInventory from "@/app/UI/inventario/Table-Inventory";
import TopContent from "@/app/UI/inventario/top-content";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Inventario | Sakura Coffee Shop',
  };

export default function InventoryPage() {
    return (
        <>
        <NavBar title={"Catalogo"}/>
        <TopContent />
        <TableInventory />
        </>
    )
}