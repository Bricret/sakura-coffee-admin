'use client';

import { Button, Chip, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react"
import { Icons } from "@/app/plugins/Icons";
import { Dialog } from "./Dialog";
import { useState } from "react";


const { VerticalDotsIcon } = Icons;



export const Action = ({ id, product } : { id : string, product: any }) => {

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);
  const [isView , setIsView] = useState(false);
  const offView = () => setIsView(false);
  const onView = () => setIsView(true);

  return (
    <div className="relative flex justify-center items-center gap-2">
    <Dropdown className=" border-1 border-default-200" aria-label="Menú de opciones">
      <DropdownTrigger aria-label="Menú de opciones">
        <Button isIconOnly radius="full" size="lg"  variant="light" aria-label="Menú de opciones">
          <VerticalDotsIcon className="text-black" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Menú de opciones">
        <DropdownItem aria-label="Ver mas" onClick={onView}>Ver mas</DropdownItem>
        <DropdownItem aria-label="Editar" href={`/dashboard/inventario/${ id }`}>Editar</DropdownItem>
        <DropdownItem aria-label="Borrar" color="danger" onClick={onOpen}>Eliminar</DropdownItem>
      </DropdownMenu>
    </Dropdown>
    <Dialog 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Eliminar Producto" 
      body="¿Esta seguro que desea eliminar este producto? Esta acción no se puede deshacer." 
      type="delete"
      id={id}
      by="inventario"
    />
    <Dialog 
      isOpen={isView} 
      onClose={offView} 
      title="Visualizando Producto" 
      body={ product } 
      type="view"
      id={id}
      by="inventario"
    />
  </div>
  );  
};


export const Disponibilidad = ({disponibilidad}: {disponibilidad: string}) => (
    <Chip className="capitalize" color={disponibilidad === 'disponible' ? "success" : "danger"} size="sm" variant="flat">
      {disponibilidad}
  </Chip>
  );
