'use client';

import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, User} from "@nextui-org/react";

export default function UserMenu({ username, rol }: { username: string, rol: string }) {
    return (
        <div className="flex flex-row items-center gap-2">
                    <Dropdown placement="bottom-start">
                        <DropdownTrigger>
                            <User
                                as="button"
                                avatarProps={{
                                src: "/Coffee-Avatar.png",
                                    alt: "User Avatar",
                                    size: "lg",
                                }}
                                className="duration-300 ease-in-out transform hover:scale-110"
                                description={ rol === '1' ? "Administrador" : "Mesero" }
                                name={ username }
                            />
                        </DropdownTrigger>
                        <DropdownMenu aria-label="User Actions" variant="flat">
                        <DropdownItem key="Create-User" href="/registerUser">Crear usuaro</DropdownItem>
                        <DropdownItem key="Create-Rol">Crear Rol</DropdownItem>
                        <DropdownItem key="Create-Permissions">Crear Permisos</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
    )
}