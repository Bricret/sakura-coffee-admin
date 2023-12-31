import { Autocomplete, AutocompleteItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";

export default function ModalChangeTable({ isOpen, onClose, tables, infoOrder } : { isOpen : boolean, onClose : any, tables : any, infoOrder : any }) {

    const onChange = async (formData : FormData ) => {
        console.log(formData);
        console.log('Change Table');
        // onClose();
        //TODO: Cambiar la mesa con verificacion si la mesa a la que desea cambiar esta libre o no
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
                            label="Mesa"
                            placeholder="Elige una mesa..." 
                            className="w-6/12 md:w-7/12 text-lg font-semibold"
                            name="table"
                            id="table"
                            size="lg"
                            >
                                {tables.map((table: any) => (
                                <AutocompleteItem key={table.id} value={table.id}>
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
        {/* <Toaster 
                dir="auto"
                visibleToasts={2}
                duration={1500}
                closeButton
                richColors
            /> */}
    </Modal>
    )
}