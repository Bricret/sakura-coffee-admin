'use client';

import { DeleteIcon, EditIcon, EyeIcon, Icons } from "@/app/plugins/Icons";
import { Tooltip } from "@nextui-org/react";
import { useState } from "react";
import { Dialog } from "../../inventario/Dialog";
import MoreInfoDialog from "./MoreInfo-Dialog";
import Link from "next/link";
import { finishOrderTo } from "@/app/lib/utils";
import { Toaster } from "sonner";
import { ErrorToast, SuccessToast } from "@/app/plugins/sonner";

const { StatusGood } = Icons;

export default function ActionOrderTo( { ordenTo } : { ordenTo: any } ) {

    const [isOpen, setIsOpen] = useState(false);
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const [isView, setView] = useState(false);
    const onView = () => setView(true);
    const onNever = () => setView(false);

    const handleFinishOrderTO = async () => {
      const res = await finishOrderTo(ordenTo.id);
      if(res.success === true) {
        SuccessToast(res.message, 'bottom-right');
      } else {
        ErrorToast(res.message, 'bottom-right');
      }
    }

    return (
        <>
        <div className="relative flex items-center justify-evenly gap-2">
          <Tooltip closeDelay={2} delay={500} content="Mas Informacion">
            <span onClick={onView} className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <EyeIcon />
            </span>
          </Tooltip>
          <Tooltip closeDelay={2} delay={500} content="Editar Pedido">
            <Link href={`/dashboard/caja/pedidos/${ordenTo.id}`} className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <EditIcon />
            </Link>
          </Tooltip>
          <Tooltip color="danger" closeDelay={2} delay={500} content="Borrar Producto">
            <span onClick={onOpen} className="text-lg text-danger cursor-pointer active:opacity-50">
              <DeleteIcon />
            </span>
          </Tooltip>
          {
            ordenTo.estado_pedido === 'pendiente' && (
              <Tooltip color="success" closeDelay={2} delay={500} content="Finalizar Pedido">
                <span onClick={handleFinishOrderTO} className="text-3xl text-success cursor-pointer active:opacity-50">
                  <StatusGood />
                </span>
              </Tooltip>
            )
          }
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
          <Toaster 
            dir="auto"
            visibleToasts={2}
            duration={1500}
            closeButton
            richColors
        />
        </>
    )
}