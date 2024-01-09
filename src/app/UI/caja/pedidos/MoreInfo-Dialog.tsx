'use client';

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

export default function MoreInfoDialog({ isOpen, onClose, ordenTo } : { isOpen : boolean, onClose : any, ordenTo: any } ) {
    return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="2xl" backdrop="blur">
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col text-xl gap-1">Descripcion del Pedido</ModalHeader>
                    <ModalBody>
                        <div>
                        <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-col gap-1 text-lg font-semibold">
                                <p>Nombre del Cliente:</p>
                                <p>Estado del Pago:</p>
                                <p>Estado del Pedido:</p>
                                <p>Fecha de Entrega:</p>
                            </div>
                            <div className="flex flex-col gap-1 text-lg">
                                <p>{ ordenTo.nombre_cliente }</p>
                                <p>{ ordenTo.estado_pago }</p>
                                <p>{ ordenTo.estado_pedido }</p>
                                <p>{ new Date(ordenTo.fecha_entrega).toLocaleDateString() }</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-lg font-semibold">Descripcion</p>
                            <p className="text-lg">{ ordenTo.observaciones }</p>
                        </div>
                        </div>
                        </div>
                    </ModalBody>
                </>
            )}
        </ModalContent>
    </Modal>
    )
}