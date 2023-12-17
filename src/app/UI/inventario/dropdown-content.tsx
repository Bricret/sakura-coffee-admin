'use client';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";
import { DropdownContentProps } from "@/app/lib/definitions";
import { Icons } from "@/app/plugins/Icons";

const { FilterIcon } = Icons;


export const DropdownContent = ({variant, color} : DropdownContentProps ) => (
    <Dropdown>
      <DropdownTrigger>
        <Button 
          color={color}
          variant={variant}
          className="capitalize text-base font-semibold text-white bg-third/90"
          startContent={ <FilterIcon className="w-4 h-6 text-white pointer-events-none flex-shrink-0" /> }
        >
          <p className="hidden md:block">Filtrar</p>
        </Button>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Dropdown Variants"
        color={color} 
        variant={variant}
      >
        <DropdownItem key="edit">Categoria</DropdownItem>
        <DropdownItem key="copy">Preparado en</DropdownItem>
        <DropdownItem key="new">Por disponibilidad</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )