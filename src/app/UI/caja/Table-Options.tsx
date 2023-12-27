'use client';

import { Icons } from "@/app/plugins/Icons";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

const { MoreIcon } = Icons;
 
export default function TableCashOption({ state }: { state?: any }) {
    return (
        <div className="">
            <Dropdown>
                <DropdownTrigger>
                    <Button
                    variant="light"
                    size="md"
                    >
                        <p className="text-2xl"><MoreIcon  /></p>
                    </Button>
                </DropdownTrigger>
               
                    {
                        state === 'libre' ?
                            <DropdownMenu aria-label="Static Actions">
                            <DropdownItem color="success">Nueva Orden</DropdownItem>
                            </DropdownMenu>
                         :
                            <DropdownMenu aria-label="Static Actions"> 
                                <DropdownItem>Ver Orden</DropdownItem>
                                <DropdownItem>Facturar</DropdownItem>
                                <DropdownItem>Cambiar de Mesa</DropdownItem>
                            </DropdownMenu>
                    }
            </Dropdown>
        </div>
    )
}