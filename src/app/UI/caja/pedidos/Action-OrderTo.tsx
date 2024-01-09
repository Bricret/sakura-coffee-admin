'use client';

import { DeleteIcon, EyeIcon } from "@/app/plugins/Icons";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { Dialog } from "../../inventario/Dialog";
import MoreInfoDialog from "./MoreInfo-Dialog";

export default function ActionOrderTo( { ordenTo } : { ordenTo: any } ) {
    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const [isView, setView] = useState(false);
    const onView = () => setView(true);
    const onNever = () => setView(false);

    return (
        <>
        <div className="relative flex items-center justify-evenly gap-2">
          <Tooltip closeDelay={2} delay={500} content="Mas Informacion">
            <span onClick={onView} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" closeDelay={2} delay={500} content="Borrar Producto">
            <span onClick={onOpen} className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon />
            </span>
          </Tooltip>
          <Dialog 
            isOpen={ isOpen } 
            onClose={ onClose } 
            title="Eliminar Producto" 
            body="¿Esta seguro que desea eliminar este producto? Esta acción no se puede deshacer." 
            type="delete"
            id={ ordenTo.id }
            by="pedidos"
          />
          <MoreInfoDialog 
            isOpen={ isView }
            onClose={ onNever }
            ordenTo={ ordenTo }
          />
          </div>
        </>
    )
}