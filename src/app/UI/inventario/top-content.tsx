import Search from "./Search";
import RightButton from "./right-button";
import InfoTable from "./Info-Table";
import { FetchAllInventory } from "@/app/lib/data";


export default async function TopContent() {

    const allProducts = await FetchAllInventory();

return (
    <header className="flex flex-col gap-4 mb-4">
        <nav className="flex justify-between gap-3 items-center md:items-end">
            <Search placeholder="busca por nombre..."/>
            <div className="flex gap-x-3">
                <RightButton route={"/dashboard/inventario/newCategory"} title={"Categoria"} />
                <RightButton route={"/dashboard/inventario/newProduct"} title={"Producto"} />
            </div>
        </nav>
        <InfoTable allProducts={ allProducts } type={"productos"}/>
    </header>
)

}