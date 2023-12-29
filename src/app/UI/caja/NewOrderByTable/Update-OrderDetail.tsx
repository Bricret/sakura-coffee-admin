'use client';
import { updateDetailOrder } from "@/app/lib/actions";
import { ErrorToast, SuccessToast } from "@/app/plugins/sonner";
import { Autocomplete, AutocompleteItem, Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Toaster } from "sonner";



export default function DialogOrder({ isOpen, onClose, products, idDetailOrder, detailOrder, idTable } : { isOpen: boolean, onClose: any, products : any, idDetailOrder : any, detailOrder : any, idTable : any }) {

  const productFound = products.find((product: any) => product.id === detailOrder.producto_id);

  async function updateDetailOrders( formData: FormData ) {
    const res = await updateDetailOrder(idDetailOrder, formData, productFound, idTable);
    if( res?.success === false ) {
      ErrorToast(res.message);
    } else {
        SuccessToast(res.message);
    }
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="2xl" backdrop="blur">
    <ModalContent>
      {(onClose) => (
        <>
          <ModalHeader className="gap-3 text-xl">Editar <span className="text-secundary font-semibold">Producto</span></ModalHeader>
          <ModalBody>
          <form action={updateDetailOrders} className="flex flex-row gap-4 items-end justify-evenly">
            <Input
              isRequired
              aria-label="Producto"
              labelPlacement="outside"
              label="Producto"
              placeholder="Busca un producto..." 
              className="w-6/12 md:w-7/12 text-lg font-semibold"
              name="product"
              id="product"
              size="lg"
              defaultValue={productFound.nombre}
              isReadOnly
            />
            <div className="flex flex-row gap-4 items-start justify-start">
              <label htmlFor="cantidad" className="text-base font-semibold flex flex-col gap-2">Cantidad
                <input 
                    type="number"
                    name="cantidad"
                    id="cantidad"
                    max={10}
                    min={1} 
                    required
                    placeholder="Cantidad"
                    className="w-full md:w-24 p-2 bg-[#f4f4f5] rounded-lg border-1 border-black/40 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent justify-center"
                    defaultValue={detailOrder.cantidad}
                    />
              </label>
            </div>
            <button 
              type="submit"
              className="bg-fourth text-white rounded-lg p-2 w-2/12 md:w-32"
              >
              Actualizar
            </button>
          </form>
          </ModalBody>
          <ModalFooter>
              <Button color="success" variant="light" onPress={onClose}>
                  Cerrar
              </Button>
          </ModalFooter>
        </>
      )}
    </ModalContent>
    <Toaster 
          dir="auto"
          visibleToasts={2}
          duration={1500}
          closeButton
          richColors
      />
  </Modal>
  );
}