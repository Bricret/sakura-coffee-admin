import PrintInvoiceTable from "@/app/UI/print/invoice/Table-Invoice";
import { FetchAllInventory, FetchDetailOrderByOrderId, FetchInvoiceById, FetchUserById } from "@/app/lib/data";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Impresion | Sakura Coffee Shop',
  };

export default async function PrintInvoicePage({params : { idOrderPrint }} : { params : { idOrderPrint : string }}) {

    const idInvoice = idOrderPrint.split('-')[0];
    const idOrder = idOrderPrint.split('-')[1];
    const invoice = await FetchInvoiceById(Number(idInvoice));
    const details_orders = await FetchDetailOrderByOrderId(Number(idOrder));
    const user = await FetchUserById(Number(invoice.user_id));
    const products = await FetchAllInventory();

    return (
        <PrintInvoiceTable invoice={invoice} details_orders={details_orders} user={user} products={products} />
    )
}