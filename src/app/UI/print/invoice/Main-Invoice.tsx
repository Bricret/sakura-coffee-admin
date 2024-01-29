
export default function MainInvoice({ details_orders } : { details_orders : any }) {

    console.log(details_orders)

    return (
    <>
    <article className="flex flex-col items-center justify-center">
        <h3 className="text-lg">================================</h3>
        <div className="flex flex-row items-center justify-between w-full px-2">
            <div className="flex flex-row gap-8 w-32">
                <h3 className="text-sm w-12">Cant</h3>
                <h3 className="text-sm w-full break-words">Producto</h3>
            </div>
            <h3 className="text-sm">Precio</h3>
            <h3 className="text-sm">Valor</h3>
        </div>
        <h3 className="text-lg">================================</h3>
    </article>
    {
    details_orders.map((detail_order : any) => (
        <section key={detail_order.id} className="flex flex-row  w-full pl-4">
            <h3 className="text-sm w-12">{detail_order.cantidad}</h3>
            <div className="flex flex-row" key={detail_order.productos.id}>
                <h3 className="text-sm w-28 break-words">{detail_order.productos.nombre}</h3>
                <h3 className="text-sm pl-2 w-20">{detail_order.productos.precio.toString()}</h3>
            </div>
            <h3 className="text-sm">{detail_order.monto_C_}</h3>
        </section>
    ))
    }
    </>
    )
}