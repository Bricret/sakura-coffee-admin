'use client';

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function UserMenu({ username, rol }: { username: string, rol: string }) {
    return (
        <Dropdown>
            <DropdownTrigger>
                <div className="flex flex-row gap-2 items-center cursor-pointer md:mr-0">
                <Image
                    src='/Coffee-Avatar.png'
                    alt="Picture of the author"
                    width={ 60 }
                    height={ 60 }
                    className="rounded-full object-cover w-12 h-12 md:w-16 md:h-16"
                />
                <div >
                    <p className="text-base font-semibold">{ username }</p>
                    <p className="text-sm text-zinc-700/60">{ rol }</p>
                </div>
                </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="User Actions" variant="flat">
            <DropdownItem key="Create-User" href="/registerUser">Crear usuaro</DropdownItem>
            <DropdownItem key="Create-Rol">Crear Rol</DropdownItem>
            <DropdownItem key="Create-Permissions">Crear Permisos</DropdownItem>
            <DropdownItem key="signout" color="danger" onClick={() => signOut({ callbackUrl: '/' })}>Cerrar Sesion</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}