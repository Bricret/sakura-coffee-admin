import NavBar from "@/app/UI/dashboard/nav-bar";
import TableInventory from "@/app/UI/inventario/Table-Inventory";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Inventario | Sakura Coffee Shop',
  };

export default function InventoryPage() {
    return (
        <>
        <NavBar title={"Catalogo"}/>
        <TableInventory />
        </>
    )
}