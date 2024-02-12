import { FetchAllInvoice, FetchCountInvoiceForDay, FetchInvoicesCurrentMonth, FetchOrdersTo } from "@/app/lib/data";
import InformationCards from "./InformationCards";
import TopCards from "./TopCards";


export default async function HeaderDashboard() {

    const allInvoice = await FetchAllInvoice();
    const InvoiceForDay = await FetchCountInvoiceForDay();
    const InvoiceForMonth = await FetchInvoicesCurrentMonth();
    const allOrdersTo = await FetchOrdersTo();

    return (
        <TopCards allInvoice={allInvoice} InvoiceForDay={InvoiceForDay} InvoiceForMonth={InvoiceForMonth} allOrdersTo={allOrdersTo} />
    )
}