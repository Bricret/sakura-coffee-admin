'use client'

import { Icons } from "@/app/plugins/Icons";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Link from "next/link";

const { PlusIcon } = Icons;


export default function RightButton() {

    function capitalize(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
    <div className="flex gap-3">
        <Dropdown>
            <DropdownTrigger className="hidden sm:flex text-white bg-secundary/60">
                <Button color="primary">
                    Estado
                </Button>
            </DropdownTrigger>
            <DropdownMenu
            disallowEmptySelection
            aria-label="Table Columns"
            closeOnSelect={false}
            selectedKeys='all'
            selectionMode="multiple"
            >
                <DropdownItem className="capitalize">
                {capitalize('david')}
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    <Link className="bg-fourth/60 text-center py-4 md:py-2 px-6 md:px-4 text-white rounded-xl " href="/dashboard/inventario/newProduct">
        Nuevo
        <PlusIcon className="hidden md:inline-block ml-2" />
    </Link> 
    </div>
    )

}