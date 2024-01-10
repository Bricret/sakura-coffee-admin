import { createNewCashFlow } from "@/app/lib/actions";
import { Autocomplete, AutocompleteItem, Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react";


export default function OpenCajaModal({ isOpen, onClose, caja } : { isOpen : boolean, onClose : any, caja : any}) {

    const onChange = async (formData : FormData ) => {
        const res = await createNewCashFlow(formData);
        console.log(res);
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} size="2xl" backdrop="blur">
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1 border-b-2 border-b-secundary">Activar Caja</ModalHeader>
                <ModalBody>
                    <form action={onChange} className="flex flex-col items-start md:flex-row gap-4 my-4 md:items-end justify-evenly">
                        <Autocomplete
                            isRequired
                            aria-label="Caja"
                            labelPlacement="outside"
                            label="Caja"
                            placeholder="Elige una caja..." 
                            className="w-full text-lg font-semibold"
                            name="caja"
                            id="caja"
                            size="lg"
                            >
                            {caja.map((item: any) => (
                            <AutocompleteItem key={item.id} value={item.id}>
                                {item.numero_caja}
                            </AutocompleteItem>
                            ))}
                        </Autocomplete>
                        <div className="flex flex-col w-full">
                            <label htmlFor="monto" className="text-lg font-semibold">
                                Monto Inicial
                            </label>
                            <input 
                                type="number"
                                required
                                placeholder="Monto Inicial de la caja"
                                name="monto"
                                id="monto"
                                className="w-full rounded-lg bg-zinc-300 p-2"
                                />
                        </div>
                        <button 
                            type="submit"
                            className="bg-fourth text-white rounded-lg p-2 w-full md:w-32"
                        >
                            Abrir
                        </button>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}