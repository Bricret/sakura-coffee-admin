'use client';
import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { Icons } from "@/app/plugins/Icons";

const { VerticalDotsIcon } = Icons;


export const Action = (
    <div className="relative flex justify-center items-center gap-2">
    <Dropdown className=" border-1 border-default-200" aria-label="Menú de opciones">
      <DropdownTrigger aria-label="Menú de opciones">
        <Button isIconOnly radius="full" size="lg"  variant="light" aria-label="Menú de opciones">
          <VerticalDotsIcon className="text-black" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Menú de opciones">
        <DropdownItem aria-label="Ver mas">Ver mas</DropdownItem>
        <DropdownItem aria-label="Editar">Editar</DropdownItem>
        <DropdownItem aria-label="Borrar">Borrar</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>  
  );


export const Disponibilidad = ({disponibilidad}: {disponibilidad: string}) => (
    <Chip className="capitalize" color={disponibilidad === 'disponible' ? "success" : "danger"} size="sm" variant="flat">
      {disponibilidad}
  </Chip>
  );
