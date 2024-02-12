import { FetchOrdersToPending, FetchTotalAmount, FetchTotalMountMoney, FetchUserWithMostInvoices } from "@/app/lib/data";
import TarjetasBajas from "./bottomCards";

export default async function FooterDashboard() {

    const ingresosTotales = await FetchTotalMountMoney();
    const TotalAmount = await FetchTotalAmount();
    const TopWaiter = await FetchUserWithMostInvoices();
    const OrdersToPending = await FetchOrdersToPending()

    return (
        <TarjetasBajas 
            ingresosTotales={ingresosTotales} 
            TotalAmount={TotalAmount} 
            TopWaiter={TopWaiter} 
            OrdersToPending={OrdersToPending} 
        />
    )
}