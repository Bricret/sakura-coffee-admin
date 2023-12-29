'use client';

import { DeleteIcon, EditIcon, EyeIcon } from "@/app/plugins/Icons";
import { Tooltip } from "@nextui-org/react";
import { Dialog } from "../../inventario/Dialog";
import { useState } from "react";
import DialogOrder from "./Dialog-Order";

export default function ActionOrder({ id, orderId, idTable } : { id : string, orderId : any, idTable : any }) {

  const [isOpen, setIsOpen] = useState(false);
  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
      <div className="relative flex items-center justify-evenly gap-2">
          <Tooltip closeDelay={2} content="Editar Producto">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
            </span>
          </Tooltip>
          <Tooltip color="danger" closeDelay={2} content="Borrar Producto">
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
            id={ id }
            by="ordenes"
            orderId={ orderId }
            idTable={ idTable }
          />
          <DialogOrder 
            isOpen={ isOpen } 
            onClose={ onClose } 
          />
      </div>
    )
}