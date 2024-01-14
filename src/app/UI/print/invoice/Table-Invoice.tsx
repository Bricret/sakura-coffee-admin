
import '../comanda/style.css'

export default function PrintInvoiceTable({ invoice, details_orders, user, products } : { invoice : any, details_orders : any, user : any, products : any}) {

    
    let fechaEmisionFormatoLocal = '';
    if(invoice?.fecha_emision) {
        const fechaEmision = new Date(invoice.fecha_emision).toISOString();
        fechaEmisionFormatoLocal = fechaEmision.substring(0, fechaEmision.length - 8);
    }

    let horaEmisionFormatoLocal = '';
    if(invoice?.hora_emision) {
        const horaEmision = new Date(invoice.hora_emision).toISOString();
        horaEmisionFormatoLocal = horaEmision.substring(0, horaEmision.length - 8);
    }

    return (
        <div>
        <div className="flex justify-center">
            <div className="flex flex-col items-center justify-center w-72 h-full">
                <div className="flex flex-col items-center justify-center pb-2">
                    <h1 className="text-2xl font-bold pb-2 p-8">Sakura Coffee Shop</h1>
                    <h3 className="text-lg">C4P8+HR2, Barrio Zaragoza, León</h3>
                    <h3 className="text-base">RUC: 123456789-0</h3>
                    <h3 className="text-sm">FACTURA ORIGINAL</h3>
                    <h3 className="text-sm">PARA LLEVAR</h3>
                </div>
                <div className="flex flex-col items-start justify-start pb-2 w-full">
                    <h3 className="text-base text-left items-start justify-start">DATOS</h3>
                    <h3 className="text-base">factura:    {invoice.numero_factura.toString()}</h3>
                    <div className="flex flex-row gap-6">
                        <h3 className="text-base">Fecha:  {fechaEmisionFormatoLocal.split('T')[0]}</h3>
                        <h3 className="text-base">Hora:   {horaEmisionFormatoLocal.split('T')[1]}</h3>
                    </div>
                    <h3 className="text-base">Cajero: {user.name}</h3>
                    <h3 className="text-base">Forma Pago: {invoice.metodo_pago}</h3>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h3 className="text-lg">================================</h3>
                    <div className="flex flex-row items-center justify-between w-full px-2">
                        <div className="flex flex-row gap-8 w-48">
                            <h3 className="text-sm w-12">Cant</h3>
                            <h3 className="text-sm w-full break-words">Producto</h3>
                        </div>
                        <h3 className="text-sm">Precio</h3>
                        <h3 className="text-sm">Valor</h3>
                    </div>
                    <h3 className="text-lg">================================</h3>
                </div>
                {
                    details_orders.map((detail_order : any) => (
                        <div key={detail_order.id} className="flex flex-row items-start justify-between w-full px-4">
                            <h3 className="text-sm w-12">{detail_order.cantidad}</h3>
                            {
                                products.map((product : any) => {
                                    if(product.id === detail_order.producto_id) {
                                        return (
                                            <>
                                                <h3 className="text-sm w-1/2 break-words">{product.nombre}</h3>
                                                <h3 className="text-sm w-20">{product.precio}</h3>
                                            </>
                                        )
                                    }
                                })
                            }
                            <h3 className="text-sm">{detail_order.monto_C_}</h3>
                        </div>
                    ))
                }
                <h3 className="text-sm mt-2">
                    ----------------------- Totales  ------------------------
                </h3>
                <div className="w-full">
                    <div className="flex flex-row items-start justify-between w-full">
                        <h3 className="text-sm w-1/3">Subtotal</h3>
                        <h3 className="text-sm">{(invoice.total_C_ - invoice.propina_C_).toString()}</h3>
                    </div>
                    <div className="flex flex-row items-start justify-between w-full">
                        <h3 className="text-sm w-1/2">Propina Sugerida</h3>
                        <h3 className="text-sm">{invoice.propina_C_}</h3>
                    </div>
                    <div className="flex flex-row items-start justify-between w-full">
                        <h3 className="text-sm w-1/3">Total C$</h3>
                        <h3 className="text-sm">{invoice.total_C_}</h3>
                    </div>
                    <div className="flex flex-row items-start justify-between w-full">
                        <h3 className="text-sm w-1/3">Total U$</h3>
                        <h3 className="text-sm">{invoice.total_U_}</h3>
                    </div>
                    <h3 className="text-sm mt-2">
                    ---------------------------------------------------------
                    </h3>
                    <div className="text-sm flex flex-col items-center justify-center">
                        <h3>GRACIAS POR SU VISITA</h3>
                        <h3>LE ESPERAMOS PRONTO</h3>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}