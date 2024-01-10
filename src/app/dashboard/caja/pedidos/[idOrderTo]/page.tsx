import NewOrderToForm from "@/app/UI/caja/pedidos/NewOrderTo-Form";
import { FetchOrdersToById } from "@/app/lib/data"


export default async function PageIdOrderTo({ params : { idOrderTo } } : { params : { idOrderTo : string } } ) {

    const orderTo = await FetchOrdersToById(Number(idOrderTo));

    return (
        <>
        <h1>Editar Pedido</h1>
       <NewOrderToForm type="edit" OrderTo={orderTo} /> 
        </>
    )
}