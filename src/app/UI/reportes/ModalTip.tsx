'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

export default function ModalTip({ isOpen, onClose, propina, startDate, endDate } : any) {

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} size="md" backdrop="blur">
            <ModalContent>
            {(onClose) => (
                <>
                    <ModalHeader className="text-2xl font-bold text-third border-b-2 border-b-secundary">Total de la Propina</ModalHeader>
                    <ModalBody>
                        <main className="flex flex-col justify-center items-center gap-y-3">
                            <h1 className="text-2xl font-semibold text-black/75 pt-4">
                                {
                                    startDate && endDate ? `Del ${startDate} hasta ${endDate}` : 'Total:'
                                }
                            </h1>
                            <h2 className="text-3xl font-bold text-secundary">C$ {propina}</h2>
                        </main>
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