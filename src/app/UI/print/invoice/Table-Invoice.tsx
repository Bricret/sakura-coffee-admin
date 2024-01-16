import '../comanda/style.css'
import BottomInvoice from './Bottom-Invoice';
import MainInvoice from './Main-Invoice';
import TopInvoice from './Top-Invoice';

export default function PrintInvoiceTable({ invoice, details_orders, user, products } : { invoice : any, details_orders : any, user : any, products : any}) {

    
    let fechaEmisionFormatoLocal = '';
    if(invoice?.fecha_emision) {
        const fechaEmision = new Date(invoice.fecha_emision).toISOString();
        fechaEmisionFormatoLocal = fechaEmision.substring(0, fechaEmision.length - 8);
    }

    let horaEmisionFormatoLocal = '';
    if(invoice?.hora_emision) {
        const horaEmision = new Date(invoice.hora_emision).toISOString();
        horaEmisionFormatoLocal = horaEmision.substring(0, horaEmision.length - 8);
    }

    return (
    <main className='flex justify-center'>
        <section className="flex flex-col items-center justify-center w-72 h-full">
            <TopInvoice 
                invoice={invoice} 
                fechaEmisionFormatoLocal={fechaEmisionFormatoLocal} 
                horaEmisionFormatoLocal={horaEmisionFormatoLocal} 
                user={user} 
            />
            
            <MainInvoice 
                details_orders={details_orders} 
                products={products} 
            />

            <BottomInvoice invoice={invoice} />
        </section>
    </main>
    )
}