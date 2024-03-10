import Image from "next/image";

export default function TopInvoice({ invoice, user } : { invoice : any , user : any}) {

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
    <>
    <header className="flex flex-col items-center justify-center pb-2">
        <Image
            src="/logo-unic.png"
            alt="Sakura Coffee Shop"
            width={100}
            height={100}
            priority
            className="object-contain rounded-full w-auto h-auto"
        />
        <h1 className="text-2xl font-bold pb-2 p-4 pt-2">Sakura Coffee Shop</h1>
        <h3 className="text-lg text-center">Supermercado la colonia 15 varas al norte. Zaragoza, León</h3>
        <h3 className="text-base">RUC: 2811911940006V</h3>
        <h3 className="text-sm">FACTURA ORIGINAL</h3>
    </header>
    <nav className="flex flex-col items-start justify-start pb-2 w-full">
        <h3 className="text-base text-left items-start justify-start">DATOS</h3>
        <h3 className="text-base">factura:    {invoice.numero_factura.toString()}</h3>
        <div className="flex flex-row gap-6">
            <h3 className="text-base">Fecha:  {fechaEmisionFormatoLocal.split('T')[0]}</h3>
            <h3 className="text-base">Hora:   {horaEmisionFormatoLocal.split('T')[1]}</h3>
        </div>
        <h3 className="text-base">Cajero: {user.name}</h3>
    </nav>
    </>
    )
}