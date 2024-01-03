import { FetchAllProductAvailability, FetchOrdersByIdTable } from "@/app/lib/data";
import TableDetailOrder from "./NewOrderByTable/Table-detail-order";


export default async function Invoice({ idTable } : { idTable : string} ) {

    const Order = await FetchOrdersByIdTable(idTable);
    const products = await FetchAllProductAvailability();

    return (
    <main className="md:flex md:flex-row flex-col">
        <article className="md:w-2/3 w-full">
            <h1 className="text-2xl mb-2">Detalle de Orden</h1>
            <TableDetailOrder idTable={ idTable } idOrder={Order.id} product={products} />
        </article>
        <article className="flex flex-col ml-0 md:ml-4 md:w-2/5 w-full">
            <h1 className="text-2xl mb-2">Cambio</h1>
            <div className="items-center justify-center w-full bg-white rounded-lg shadow-large pl-4 text-lg text-zinc-600 py-4">
                <form action="#" >
                    <div className="flex flex-col">
                    <label htmlFor="monto" className="text-secundary">Monto</label>
                    <input 
                        type="number" 
                        name="monto" 
                        id="monto"
                        required
                        placeholder="Dinero recibido por el cliente"
                        className="w-10/12 h-10 mb-2 border-1 p-1 border-black/40 rounded-lg shadow-small" 
                    />
                    </div>
                    <div className="flex flex-col">
                    <label htmlFor="cambio" className="text-secundary">Cambio</label>
                    <input 
                        type="number" 
                        name="cambio" id="cambio" 
                        readOnly
                        placeholder="Cambio para el cliente"
                        defaultValue={0}
                        className="w-10/12 h-10 mb-2 p-1 border-1 border-black/40 rounded-lg shadow-small" 
                    />
                    </div>
                    <button className="mt-2">
                        <span className="text-white bg-secundary rounded-lg px-4 py-2">Pagar</span>
                    </button>
                </form>
            </div>
        </article>
    </main>
    )
}