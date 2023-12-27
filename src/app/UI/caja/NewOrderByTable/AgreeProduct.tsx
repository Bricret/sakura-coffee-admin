import { FetchAllProductAvailability } from "@/app/lib/data";
import InputProduct from "./InputProduct";


export default async function AgreeProduct() {
    
    const products = await FetchAllProductAvailability();

      return (
        <>
            <InputProduct products={ products } />
        </>
      );
}