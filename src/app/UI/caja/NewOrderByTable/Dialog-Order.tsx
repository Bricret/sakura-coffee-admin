'use client';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";



export default function DialogOrder({ isOpen, onClose } : { isOpen: boolean, onClose: () => void}) {
    return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="2xl" backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Enrique</ModalHeader>
            <ModalBody>
                    <div className="bg-secundary/70 rounded-xl flex flex-col justify-center p-4 text-white">
                      <div className="flex flex-col gap-2">
                        <label 
                          htmlFor="nombre" 
                          className="font-bold text-lg"
                        >
                          Nombre
                        </label>
                        <input 
                          type="text" 
                          name="nombre" 
                          id="nombre" 
                          className="rounded-xl pl-4 py-3" 
                          disabled 
                        />
                      </div>
                    </div>
            </ModalBody>
            <ModalFooter>
                <Button color="success" variant="light" onPress={onClose}>
                    Cerrar
                </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
      {/* <Toaster 
            dir="auto"
            visibleToasts={2}
            duration={1500}
            closeButton
            richColors
        /> */}
    </Modal>
  );
}