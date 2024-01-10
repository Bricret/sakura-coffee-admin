import ActiveCajaForm from "@/app/UI/caja/cierre/ActiveCaja-Form";
import InfoCash from "@/app/UI/caja/cierre/Info-Cash";
import { FetchCaja, FetchCashFlow } from "@/app/lib/data";



export default async function CierrePage() {

    const caja = await FetchCaja();
    const Cashflow = await FetchCashFlow();
    const cajaActiva = caja.filter((item : any) => item.estado === "abierto");

    let fechaEntregaFormatoLocal = '';
    if(Cashflow?.fecha_apertura) {
        const fechaEntrega = new Date(Cashflow.fecha_apertura).toISOString();
        fechaEntregaFormatoLocal = fechaEntrega.substring(0, fechaEntrega.length - 8);
    }

    return (
        <div className="flex flex-col gap-4">
        {cajaActiva.length === 0 ? (
            <>
            <div className="flex items-center justify-end w-full md:w-1/3">
                <ActiveCajaForm caja={caja}/>
            </div>
            <div className="flex items-center justify-center my-auto mx-auto h-60 md:h-96">
                <h1 className="text-3xl md:text-5xl text-zinc-600/40 cursor-default">Active una caja</h1>
            </div>
        </>
        ) : (
            <InfoCash cajaActiva={cajaActiva} Cashflow={Cashflow} fechaEntregaFormatoLocal={fechaEntregaFormatoLocal} />
        )}
        </div>
    )
}