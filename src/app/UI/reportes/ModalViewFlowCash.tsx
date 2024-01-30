'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";


export default function ModalViewFlowCash({ isOpen, onClose, FLowCash } : { isOpen : any, onClose : any, FLowCash : any }) {

    let fechaAperturaFormatoLocal = '';
    if(FLowCash?.fecha_apertura) {
        const fecha_apertura = new Date(FLowCash.fecha_apertura).toISOString();
        fechaAperturaFormatoLocal = fecha_apertura.substring(0, fecha_apertura.length - 8);
    }

    let horaAperturaFormatoLocal = '';
    if(FLowCash?.hora_apertura) {
        const hora_apertura = new Date(FLowCash.hora_apertura).toISOString();
        horaAperturaFormatoLocal = hora_apertura.substring(0, hora_apertura.length - 8);
    }

    let fechaCierreFormatoLocal = '';
    if(FLowCash?.fecha_cierre) {
        const fecha_cierre = new Date(FLowCash.fecha_cierre).toISOString();
        fechaCierreFormatoLocal = fecha_cierre.substring(0, fecha_cierre.length - 8);
    }

    let horaCierreFormatoLocal = '';
    if(FLowCash?.hora_cierre) {
        const hora_cierre = new Date(FLowCash.hora_cierre).toISOString();
        horaCierreFormatoLocal = hora_cierre.substring(0, hora_cierre.length - 8);
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} size="2xl" backdrop="blur">
        <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="text-2xl font-bold text-third border-b-2 border-b-secundary">Flujo de caja N° {FLowCash.id.toString()}</ModalHeader>
                    <ModalBody>
                        <ul className="flex flex-col gap-2">
                            <li className="flex flex-row  gap-2">
                                <span className="text-lg font-semibold">Fecha y Hora de Apertura:</span>
                                <span>{fechaAperturaFormatoLocal.split('T')[0]}</span> ||
                                <span>{horaAperturaFormatoLocal.split('T')[1]}</span>
                            </li>
                            <li className="flex flex-row gap-2">
                                <span className="text-lg font-semibold">Fecha y Hora de Cierre:</span>
                                <span>{fechaCierreFormatoLocal.split('T')[0]}</span> ||
                                <span>{horaCierreFormatoLocal.split('T')[1]}</span>
                            </li>
                            <li className="flex flex-row gap-2">
                                <span className="text-lg font-semibold">Monto Inicial C$:</span>
                                <span>{FLowCash.monto_inicial_C_}</span>
                            </li>
                            <li className="flex flex-row gap-2">
                                <span className="text-lg font-semibold">Monto Inicial U$</span>
                                <span>{FLowCash.monto_inicial_U_}</span>
                            </li>
                            <li className="flex flex-row gap-2">
                                <span className="text-lg font-semibold">Monto Final C$:</span>
                                <span>{FLowCash.monto_final_C_}</span>
                            </li>
                            <li className="flex flex-row gap-2">
                                <span className="text-lg font-semibold">Monto Final U$</span>
                                <span>{FLowCash.monto_final_U_}</span>
                            </li>
                            <li className="flex flex-row gap-2">
                                <span className="text-lg font-semibold text-red-500">Faltante:</span>
                                <span>{FLowCash.faltante_caja}</span>
                            </li>
                            <li className="flex flex-row gap-2">
                                <span className="text-lg font-semibold text-green-500">Sobrante:</span>
                                <span>{FLowCash.sobrante_caja}</span>
                            </li>
                            <li className="flex flex-row gap-2">
                                <span className="text-lg font-semibold">Caja Activada Por:</span>
                                <span>{FLowCash.users.name}</span>
                            </li>
                            <li className="flex flex-col gap-y-2">
                                <span className="text-xl font-bold text-third">Observaciones:</span>
                                <span>{FLowCash.observaciones}</span>
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