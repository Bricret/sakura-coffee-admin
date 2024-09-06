import { FetchCashFlowByDate } from "@/app/lib/data";

export default async function InfoCash({ cajaActiva } : { cajaActiva: any }) {

    let Cashflow = await FetchCashFlowByDate();

    console.log(Cashflow);

    if (Cashflow === null && cajaActiva !== null) {
        const actualDate = new Date().toISOString();
        let date = new Date(actualDate);
        date.setDate(date.getDate() - 1);
        date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
        const openOnlyDate = date.toISOString().split('T')[0] + 'T00:00:00.000Z';
        Cashflow = await FetchCashFlowByDate(openOnlyDate);
    }

    let fechaEntregaFormatoLocal = '';
    if(Cashflow?.fecha_apertura) {
        const fechaEntrega = new Date(Cashflow.fecha_apertura).toISOString();
        fechaEntregaFormatoLocal = fechaEntrega.substring(0, fechaEntrega.length - 8);
    }


    return (
        <div className="flex flex-row items-center md:items-end justify-between gap-4 cursor-default">
            <h1 className="text-xl md:text-center md:text-3xl text-green-500 font-semibold w-1/3">Caja Activa</h1>
            <div className="flex flex-row items-center justify-between gap-4 w-full">
                <h2 className="text-base md:text-xl font-semibold w-1/2 md:w-auto">Caja N°:
                    <span className="font-normal"> { cajaActiva.numero_caja }</span>
                </h2>
                <h2 className="text-base md:text-xl font-semibold">Monto Inicial:  
                    <span className="font-normal"> C$ { Cashflow.monto_inicial_C_ }</span>
                </h2>
                <h2 className="text-base md:text-xl font-semibold">Fecha de Apertura: 
                    <span className="font-normal"> { fechaEntregaFormatoLocal.split('T')[0] }</span>
                </h2>
            </div>
        </div>
    )
}