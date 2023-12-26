import Search from "./Search";
import RightButton from "./right-button";
import InfoTable from "./Info-Table";
import { FetchAllInventory } from "@/app/lib/data";


export default async function TopContent() {

    const allProducts = await FetchAllInventory();

return (
    <div className="flex flex-col gap-4 mb-4">
        <div className="flex justify-between gap-3 items-center md:items-end">
            <Search placeholder="busca por nombre..."/>
            <RightButton route={"/dashboard/inventario/newProduct"} />
        </div>
        <InfoTable allProducts={ allProducts }/>
    </div>
)

}