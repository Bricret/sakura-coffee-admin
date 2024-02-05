import PrintInvoiceTable from "@/app/UI/print/invoice/Table-Invoice";
import { FetchInvoiceById } from "@/app/lib/data";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Impresion | Sakura Coffee Shop',
  };

export default async function PrintInvoicePage({params : { idOrderPrint }} : { params : { idOrderPrint : string }}) {

    const idInvoice = idOrderPrint.split('-')[0];
    const invoice = await FetchInvoiceById(Number(idInvoice));
    return (
        <PrintInvoiceTable invoice={invoice} />
    )
}