import '../comanda/style.css'
import BottomInvoice from './Bottom-Invoice';
import MainInvoice from './Main-Invoice';
import TopInvoice from './Top-Invoice';

export default function PrintInvoiceTable({ invoice } : { invoice : any }) {

    return (
    <main className='flex justify-center'>
        <section className="flex flex-col items-center justify-center w-72 h-full">
            <TopInvoice 
                invoice={invoice} 
                user={invoice.users} 
            />
            
            <MainInvoice 
                details_orders={invoice.ordens.detalle_ordens}
            />

            <BottomInvoice invoice={invoice} />
        </section>
    </main>
    )
}