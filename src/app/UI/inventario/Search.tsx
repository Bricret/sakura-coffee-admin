import { Icons } from "@/app/plugins/Icons";
import { Input } from "@nextui-org/react";

const { SearchIcon } = Icons;


export default function Search() {
    return (
        <div className="w-full gap-4">
            <div className=" w-full mb-6 md:mb-0 gap-4">
                <Input
                type="text"
                placeholder="Busque un producto o platillo"
                labelPlacement="outside"
                startContent={
                    <SearchIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                />
            </div>
        </div>
    )
}