import { FetchCashFlowByDate, FetchInvoiceByDate } from "@/app/lib/data";
import TablesFormsNomination from "./TablesFormsNomination";

export default async function NominationForm({ cajaActiva } : any ) {

    let Cashflow = await FetchCashFlowByDate();
    if (Cashflow === null && cajaActiva !== null) {
        const actualDate = new Date().toISOString();
        let date = new Date(actualDate);
        date.setDate(date.getDate() - 1);
        date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
        const openOnlyDate = date.toISOString().split('T')[0] + 'T00:00:00.000Z';
        Cashflow = await FetchCashFlowByDate(openOnlyDate);
    }

    let InvoiceForDay = null;
    if (Cashflow !== null) {
        console.log('Si hay caja activa');
        InvoiceForDay = await FetchInvoiceByDate(Cashflow.fecha_apertura);
        console.log('Resultado de la consulta de invoice:', InvoiceForDay);
    }

    console.log({Cashflow, InvoiceForDay});
    return (
        <TablesFormsNomination Cashflow={Cashflow} Invoice={InvoiceForDay} />
    )
}