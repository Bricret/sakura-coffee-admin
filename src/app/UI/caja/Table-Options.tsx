'use client';

import { Icons } from "@/app/plugins/Icons";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import Link from "next/link";

const { MoreIcon } = Icons;
 
export default function TableCashOption({ state, idTable }: { state? : string, idTable? : string }) {
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
                                <DropdownItem color="success">
                                    <Link 
                                        href={`/dashboard/caja/newOrder/${idTable}`}
                                    >Nueva Orden</Link>
                                </DropdownItem>
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