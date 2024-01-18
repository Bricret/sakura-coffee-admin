
export default function MainInvoice({ details_orders, products } : { details_orders : any, products : any}) {

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
        <section key={detail_order.id} className="flex flex-row items-start justify-between w-full px-4">
            <h3 className="text-sm w-12">{detail_order.cantidad}</h3>
            {
                products.map((product : any) => {
                    if(product.id === detail_order.producto_id) {
                        return (
                            <div className="flex flex-row" key={product.id}>
                                <h3 className="text-sm w-1/2 break-words">{product.nombre}</h3>
                                <h3 className="text-sm pl-3 w-20">{product.precio.toString()}</h3>
                            </div>
                        )
                    }
                })
            }
            <h3 className="text-sm">{detail_order.monto_C_}</h3>
        </section>
    ))
    }
    </>
    )
}