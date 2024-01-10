'use client';

import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";

export default function MoreInfoDialog({ isOpen, onClose, ordenTo } : { isOpen : boolean, onClose : any, ordenTo: any } ) {

    let fechaEntregaFormatoLocal = '';
    let fechaPedidoFormatoLocal = '';
    if(ordenTo?.fecha_entrega) {
        const fechaEntrega = new Date(ordenTo.fecha_entrega).toISOString();
        const fechaPedido = new Date(ordenTo.fecha_pedido).toISOString();
        fechaEntregaFormatoLocal = fechaEntrega.substring(0, fechaEntrega.length - 8);
        fechaPedidoFormatoLocal = fechaPedido.substring(0, fechaPedido.length - 8);
    }

    return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="2xl" backdrop="blur">
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="flex flex-col text-xl gap-1 border-b-2 border-b-secundary">Descripcion del Pedido</ModalHeader>
                    <ModalBody>
                        <div>
                        <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-col gap-1 text-lg font-semibold">
                                <p>Nombre del Cliente:</p>
                                <p>Direccion del Cliente:</p>
                                <p>Estado del Pago:</p>
                                <p>Estado del Pedido:</p>
                                <p>Fecha de Pedido:</p>
                                <p>Fecha de Entrega:</p>
                                <p>Telefono del Cliente:</p>
                                <p>Telefono Adicional:</p>
                                <p>Anticipo:</p>
                                <p>Total:</p>
                                <p>Faltante:</p>
                            </div>
                            <div className="flex flex-col gap-1 text-lg">
                                <p>{ ordenTo.nombre_cliente }</p>
                                <p>{ ordenTo.direccion_cliente }</p>
                                <p>{ ordenTo.estado_pago }</p>
                                <p>{ ordenTo.estado_pedido }</p>
                                <p>{ fechaPedidoFormatoLocal.split('T')[0] }</p>
                                <p>{ fechaEntregaFormatoLocal.split('T')[0] }</p>
                                <p>{ ordenTo.telefono_cliente }</p>
                                <p>{ ordenTo.telefono_adicional_cliente || 'No registrado.' }</p>
                                <p>{ ordenTo.anticipo }</p>
                                <p>{ ordenTo.total }</p>
                                <p>{ Number( ordenTo.total - ordenTo.anticipo ) }</p>
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