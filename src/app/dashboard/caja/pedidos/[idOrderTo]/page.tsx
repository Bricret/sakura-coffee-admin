import { fonts } from "@/app/UI/Fonts";
import NewOrderToForm from "@/app/UI/caja/pedidos/NewOrderTo-Form";
import { FetchOrdersToById } from "@/app/lib/data"


export default async function PageIdOrderTo({ params : { idOrderTo } } : { params : { idOrderTo : string } } ) {

    const orderTo = await FetchOrdersToById(Number(idOrderTo));

    return (
        <>
        <h1 
            className={`${fonts.merriweather.className} text-4xl font-bold mb-4`}>
            Creando Nuevo <span className="text-secundary">Pedido</span>
        </h1>
       <NewOrderToForm type="edit" OrderTo={orderTo} /> 
        </>
    )
}