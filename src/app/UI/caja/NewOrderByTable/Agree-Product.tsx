import { FetchAllProductAvailability } from "@/app/lib/data";
import InputProduct from "./Input-Product";
import TableDetailOrder from "./Table-detail-order";
import { fonts } from "../../Fonts";


export default async function AgreeProduct({ idTable, idOrder } : { idTable? : string, idOrder? : string }) {
    
    const products = await FetchAllProductAvailability();
      return (
        <article>
            <header >  
                <InputProduct products={ products } idOrder={ idOrder } idTable={ idTable } />
            </header>
            <h1 
                className={ `${ fonts.merriweather.className } font-semibold text-xl mt-10 mb-4` }>
                Detalle de la orden
            </h1>
            <section className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small w-full">
                <TableDetailOrder idOrder={ idOrder } product = { products } idTable={ idTable }/>
            </section>
        </article>
      );
}