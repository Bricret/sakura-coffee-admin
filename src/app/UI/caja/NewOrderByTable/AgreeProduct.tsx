import { FetchAllProductAvailability } from "@/app/lib/data";
import InputProduct from "./InputProduct";


export default async function AgreeProduct() {
    
    const products = await FetchAllProductAvailability();

      return (
        <main>
            <header > 
                <form action="#" className="flex flex-row gap-4 items-end justify-between">
                    <InputProduct products={ products } />
                    <button 
                        type="submit"
                        className="bg-fourth text-white rounded-lg p-2 w-2/12 md:w-32"
                    >
                        Agregar
                    </button>
                </form>
            </header>
        </main>
      );
}