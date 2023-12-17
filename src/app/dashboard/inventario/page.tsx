import FilterMenu from "@/app/UI/inventario/Filter-menu";
import Search from "@/app/UI/inventario/Search";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Inventario | Sakura Coffee Shop',
  };

export default function InventoryPage() {
    return (
        <div className="flex flex-row w-full gap-4">
            <FilterMenu />
            <Search />
        </div>
    )
}