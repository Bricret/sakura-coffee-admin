
const dir = process.env.NEXT_PUBLIC_URL;
export function printInvoiceFunction(invoiceId : number, orderId : number) {

    const orderIdAndTableId = `${invoiceId.toString()}-${orderId.toString()}`
    const url = `${dir}print/printInvoice/${orderIdAndTableId}`;
    const windowFeatures = 'noopener,noreferrer';
    window.open(url, '_blank', windowFeatures);
}