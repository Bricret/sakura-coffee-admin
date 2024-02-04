import { updateOderTable } from "@/app/lib/actions";
import { ErrorToast } from "@/app/plugins/sonner";
import { Autocomplete, AutocompleteItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Toaster } from "sonner";

export default function ModalChangeTable({ isOpen, onClose, tables, infoOrder } : { isOpen : boolean, onClose : any, tables : any, infoOrder : any }) {

    console.log(infoOrder)

    const onChange = async (formData : FormData ) => {
        const res = await updateOderTable(formData, infoOrder);
        if( res?.success === false ) ErrorToast(res.message);
    }
    return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="2xl" backdrop="blur">
        <ModalContent>
            {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1">Cambiar Mesa</ModalHeader>
                <ModalBody>
                    <form action={onChange} className="flex flex-row gap-4 items-end justify-evenly">
                        <Autocomplete
                            isRequired
                            labelPlacement="outside"
                            aria-labelledby="table"
                            label="table"
                            placeholder="Elige una mesa..." 
                            className="w-6/12 md:w-7/12 text-lg font-semibold"
                            name="table"
                            id="table"
                            size="lg"
                            >
                                {tables.map((table: any) => (
                                <AutocompleteItem key={table.id} id="table" value={table.id}>
                                    {table.nombre}
                                    </AutocompleteItem>
                                ))}
                        </Autocomplete>
                        <button 
                            type="submit"
                            className="bg-fourth text-white rounded-lg p-2 w-2/12 md:w-32"
                        >
                            Cambiar
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
    )
}