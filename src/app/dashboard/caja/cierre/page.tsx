import ActiveCajaForm from "@/app/UI/caja/cierre/ActiveCaja-Form";
import InfoCash from "@/app/UI/caja/cierre/Info-Cash";
import NominationForms from "@/app/UI/caja/cierre/Nomination-Forms";
import { FetchCaja, FetchCajaActive, FetchCashFlowByDate, FetchInvoiceByDate } from "@/app/lib/data";



export default async function CierrePage() {
    const caja = await FetchCaja();
    const Cashflow = await FetchCashFlowByDate();
    const cajaActiva = await FetchCajaActive();
    const InvoiceForDay = await FetchInvoiceByDate(Cashflow.fecha_apertura);

    let fechaEntregaFormatoLocal = '';
    if(Cashflow?.fecha_apertura) {
        const fechaEntrega = new Date(Cashflow.fecha_apertura).toISOString();
        fechaEntregaFormatoLocal = fechaEntrega.substring(0, fechaEntrega.length - 8);
    }

    return (
    <>
    <main className="flex flex-col mb-10">
    {cajaActiva === null ? (
        <header>
        <article className="flex flex-col w-full md:w-1/3">
            <ActiveCajaForm caja={caja}/>
        </article>
        <article className="flex items-center justify-center my-auto mx-auto h-60 md:h-96">
            <h1 className="text-3xl md:text-5xl text-zinc-600/40 cursor-default">Active una caja</h1>
        </article>
        </header>
    ) : (
        <>
        <InfoCash cajaActiva={cajaActiva} Cashflow={Cashflow} fechaEntregaFormatoLocal={fechaEntregaFormatoLocal} />
        <NominationForms Cashflow={ Cashflow } Invoice={ InvoiceForDay }  />
        </>
        
    )}
    </main>
    </>
    )
}