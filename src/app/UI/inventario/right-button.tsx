'use client'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Link from "next/link";


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
    <Dropdown>
        <DropdownTrigger className="hidden sm:flex">
            <Button  variant="flat" className="text-white bg-secundary/60">
            Ver mas
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
                {capitalize('metodo')}
            </DropdownItem>
        </DropdownMenu>
    </Dropdown>
    <Link className="group relative items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal overflow-hidden tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 px-unit-4 min-w-unit-20 h-unit-10 text-small gap-unit-2 rounded-medium [&>svg]:max-w-[theme(spacing.unit-8)] data-[pressed=true]:scale-[0.97] transition-transform-colors-opacity motion-reduce:transition-none data-[hover=true]:opacity-hover z-10 aria-expanded:scale-[0.97] aria-expanded:opacity-70 subpixel-antialiased hidden sm:flex text-white bg-fourth/60" href="/dashboard/inventario/newProduct">
        Nuevo
    </Link> 
    </div>
    )

}