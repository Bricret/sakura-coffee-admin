import { deleteProduct } from "@/app/lib/actions";
import { FetchUnicProduct } from "@/app/lib/data";
import { DialogProps } from "@/app/lib/definitions";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

export const  Dialog = ({ isOpen, onClose, title, body, type, id } : DialogProps) => {

  const onDelete  = async () => {
    await deleteProduct(id);
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="2xl" backdrop="blur">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{ title }</ModalHeader>
            <ModalBody>
              {
                type === 'delete' ? (
                  <>
                    <p className="text-sm text-default-500">{ body }</p>
                  </>
                ) : (
                  <>
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
                          defaultValue={ body?.nombre }
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label 
                          htmlFor="descripcion" 
                          className="font-bold text-lg"
                        >
                          Descripcion
                        </label>
                        <input 
                          type="text" 
                          name="descripcion" 
                          id="descripcion" 
                          className="rounded-xl pl-4 py-3 overflow-x-auto" 
                          disabled 
                          defaultValue={ body?.descripcion }
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label 
                          htmlFor="precio" 
                          className="font-bold text-lg"
                        >
                          Precio
                        </label>
                        <input 
                          type="text" 
                          name="precio" 
                          id="precio" 
                          className="rounded-xl pl-4 py-3" 
                          disabled 
                          defaultValue={ `C$ ${body?.precio}` }
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label 
                          htmlFor="preparado_en" 
                          className="font-bold text-lg"
                        >
                          Preparado en
                        </label>
                        <input 
                          type="text" 
                          name="preparado_en" 
                          id="preparado_en" 
                          className="rounded-xl pl-4 py-3" 
                          disabled 
                          defaultValue={ body?.preparado_en }
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label 
                          htmlFor="disponibilidad" 
                          className="font-bold text-lg"
                        >
                          Disponibilidad
                        </label>
                        <input 
                          type="text" 
                          name="disponibilidad" 
                          id="disponibilidad" 
                          className="rounded-xl pl-4 py-3" 
                          disabled 
                          defaultValue={ body?.disponibilidad }
                        />
                      </div>
                    </div>
                  </>
                )
              }
            </ModalBody>
            <ModalFooter>
              {
                type === 'delete' ? (
                  <>
                    <Button color="success"  onPress={onClose}>
                      Cancelar
                    </Button>
                    <Button color="danger" variant="light" onPress={onDelete}>
                      Eliminar
                    </Button>
                  </>
                ) : (
                  <>
                    <Button color="success" variant="light" onPress={onClose}>
                      Cerrar
                    </Button>
                  </>
                )
              }
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
