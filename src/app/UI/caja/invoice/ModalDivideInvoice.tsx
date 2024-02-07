'use client'

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react"
import OrderDetailsTable from "./OrderDetailsTable"

export default function ModalDivideInvoice({ isOpen, onClose, detailsOrder, order} : any) {

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="4xl" backdrop="blur">
        <ModalContent>
        {(onClose) => (
            <>
            <ModalHeader className="text-2xl font-bold text-third border-b-2 border-b-secundary">Dividir Cuenta</ModalHeader>
            <ModalBody>
                <OrderDetailsTable detailsOrder={detailsOrder} order={order} />
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
