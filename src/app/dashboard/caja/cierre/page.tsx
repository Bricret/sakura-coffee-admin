import ActiveCajaForm from "@/app/UI/caja/cierre/ActiveCaja-Form";
import HandleBadCLose from "@/app/UI/caja/cierre/HandleBadCLose";
import InfoCash from "@/app/UI/caja/cierre/Info-Cash";
import NominationForms from "@/app/UI/caja/cierre/Nomination-Forms";
import { FetchCaja, FetchCajaActive, FetchCashFlowByDate, FetchInvoiceByDate } from "@/app/lib/data";



export default async function CierrePage() {
    const caja = await FetchCaja();
    const cajaActive = await FetchCajaActive();
    let Cashflow = null;
    Cashflow = await FetchCashFlowByDate();

    
    if (Cashflow === null && cajaActive !== null) {
        const actualDate = new Date().toISOString();
        let date = new Date(actualDate);
        date.setDate(date.getDate() - 1);
        date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
        const openOnlyDate = date.toISOString().split('T')[0] + 'T00:00:00.000Z';
        console.log(openOnlyDate);
        Cashflow = await FetchCashFlowByDate(openOnlyDate);
        console.log(cajaActive);
    }

    let InvoiceForDay = null;
    if (Cashflow !== null) {
        InvoiceForDay = await FetchInvoiceByDate(Cashflow.fecha_apertura);
    }


    let fechaEntregaFormatoLocal = '';
    if(Cashflow?.fecha_apertura) {
        const fechaEntrega = new Date(Cashflow.fecha_apertura).toISOString();
        fechaEntregaFormatoLocal = fechaEntrega.substring(0, fechaEntrega.length - 8);
    }

    return (
    <>
    <main className="flex flex-col mb-10">
    {cajaActive === null ? (
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
        <InfoCash cajaActiva={cajaActive} Cashflow={Cashflow} fechaEntregaFormatoLocal={fechaEntregaFormatoLocal} />
        <NominationForms Cashflow={ Cashflow } Invoice={ InvoiceForDay }  />
        </>
        
    )}
    </main>
    </>
    )
}