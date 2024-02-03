import { FetchAllInvoice, FetchCountInvoiceForDay, FetchInvoicesCurrentMonth, FetchOrdersTo } from "@/app/lib/data";
import InformationCards from "./InformationCards";


export default async function HeaderDashboard() {

    const allInvoice = await FetchAllInvoice();
    const InvoiceForDay = await FetchCountInvoiceForDay();
    const InvoiceForMonth = await FetchInvoicesCurrentMonth();
    const allOrdersTo = await FetchOrdersTo();

    return (
        <header className="flex gap-x-6 mb-6">
            <InformationCards title="Facturas del dia" style1="border-b-blue-500" style2="bg-blue-100" data={InvoiceForDay || 0}  />
            <InformationCards title="Facturas Mensuales" style1="border-b-red-500" style2="bg-red-100" data={InvoiceForMonth || 0}  />
            <InformationCards title="Facturas Totales" style1="border-b-orange-500" style2="bg-orange-100" data={allInvoice || 0}  />
            <InformationCards title="Pedidos Realizados" style1="border-b-green-500" style2="bg-green-100" data={allOrdersTo || 0}  />
        </header>
    )
}