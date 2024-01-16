
export default function TopInvoice({ invoice, fechaEmisionFormatoLocal, horaEmisionFormatoLocal, user } : { invoice : any, fechaEmisionFormatoLocal : any, horaEmisionFormatoLocal : any, user : any}) {

    return (
    <>
    <header className="flex flex-col items-center justify-center pb-2">
        <h1 className="text-2xl font-bold pb-2 p-4">Sakura Coffee Shop</h1>
        <h3 className="text-lg">C4P8+HR2, Barrio Zaragoza, León</h3>
        <h3 className="text-base">RUC: 123456789-0</h3>
        <h3 className="text-sm">FACTURA ORIGINAL</h3>
        <h3 className="text-sm">PARA LLEVAR</h3>
    </header>
    <nav className="flex flex-col items-start justify-start pb-2 w-full">
        <h3 className="text-base text-left items-start justify-start">DATOS</h3>
        <h3 className="text-base">factura:    {invoice.numero_factura.toString()}</h3>
        <div className="flex flex-row gap-6">
            <h3 className="text-base">Fecha:  {fechaEmisionFormatoLocal.split('T')[0]}</h3>
            <h3 className="text-base">Hora:   {horaEmisionFormatoLocal.split('T')[1]}</h3>
        </div>
        <h3 className="text-base">Cajero: {user.name}</h3>
        <h3 className="text-base">Forma Pago: {invoice.metodo_pago}</h3>
    </nav>
    </>
    )
}