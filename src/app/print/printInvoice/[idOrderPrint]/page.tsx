import { FetchInvoiceById } from "@/app/lib/data";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Impresion | Sakura Coffee Shop',
  };

export default async function PrintInvoicePage({params : { idOrderPrint }} : { params : { idOrderPrint : string }}) {

    const order = await FetchInvoiceById(Number(idOrderPrint));

    console.log(order);

    return (
        <h1>hola { idOrderPrint }</h1>
    )
}