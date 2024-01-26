'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";


export default function ModalViewInvoice({ isOpen, onClose, Invoice } : { isOpen : boolean, onClose : any, Invoice : any }) {


    console.log(Invoice);
    let fechaEntregaFormatoLocal = '';
    if(Invoice?.fecha_emision) {
        const fecha_emision = new Date(Invoice.fecha_emision).toISOString();
        fechaEntregaFormatoLocal = fecha_emision.substring(0, fecha_emision.length - 8);
    }

    let horaEntregaFormatoLocal = '';
    if(Invoice?.hora_emision) {
        const hora_emision = new Date(Invoice.hora_emision).toISOString();
        horaEntregaFormatoLocal = hora_emision.substring(0, hora_emision.length - 8);
    }


    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} size="2xl" backdrop="blur">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="text-2xl font-bold text-third border-b-2 border-b-secundary">Factura N° {Invoice.numero_factura.toString()}</ModalHeader>
                        <ModalBody>
                            <ul className="flex flex-col gap-2">
                                <li className="flex flex-row gap-2">
                                    <span className="text-lg font-semibold">Fecha de Emision:</span>
                                    <span>{fechaEntregaFormatoLocal.split('T')[0]}</span>
                                </li>
                                <li className="flex flex-row gap-2">
                                    <span className="text-lg font-semibold">Hora de Emision:</span>
                                    <span>{horaEntregaFormatoLocal.split('T')[1]}</span>
                                </li>
                                <li className="flex flex-row gap-2">
                                    <span className="text-lg font-semibold">Mesa:</span>
                                    <span>{Invoice.ordens.mesa_id === null ? 'No hay mesa registrada a esta factura.' : `N° ${Invoice.ordens.mesa_id.toString()}`}</span>
                                </li>
                                <li className="flex flex-row gap-2">
                                    <span className="text-lg font-semibold">Metodo de Pago:</span>
                                    <span>{Invoice.metodo_pago}</span>
                                </li>
                                <li className="flex flex-row gap-2">
                                    <span className="text-lg font-semibold">Atendido Por:</span>
                                    <span>{Invoice.users.name}</span>
                                </li>
                                <li className="flex flex-row gap-2">
                                    <span className="text-lg font-semibold">Propina C$:</span>
                                    <span>{Invoice.propina_C_}</span>
                                </li>
                                <li className="flex flex-row gap-2">
                                    <span className="text-lg font-semibold">Propina U$:</span>
                                    <span>{Invoice.propina_U_}</span>
                                </li>
                                <li className="flex flex-row gap-2">
                                    <span className="text-lg font-semibold">Total C$:</span>
                                    <span>{Invoice.total_C_}</span>
                                </li>
                                <li className="flex flex-row gap-2">
                                    <span className="text-lg font-semibold">Total U$:</span>
                                    <span>{Invoice.total_U_}</span>
                                </li>
                                <li className="flex flex-col gap-y-2">
                                    <span className="text-xl font-bold text-third">Productos Vendidos:</span>
                                    {
                                        Invoice.ordens.detalle_ordens.map((item : any) => (
                                            <div key={item.id} className="flex flex-row gap-2">
                                                <span className="text-lg font-semibold">{item.productos.nombre}:</span>
                                                <span>{item.cantidad}</span>
                                            </div>
                                        ))
                                    }
                                </li>
                            </ul>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="success" variant="light" onPress={onClose}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}