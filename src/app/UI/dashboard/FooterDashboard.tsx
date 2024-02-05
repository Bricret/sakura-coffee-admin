import { StarIcons, UpArrowIcon } from "@/app/plugins/Icons";
import InformationBottomCards from "./InformationBottomCards";
import { FetchOrdersToPending, FetchTotalAmount, FetchTotalMountMoney, FetchUserWithMostInvoices } from "@/app/lib/data";

export default async function FooterDashboard() {

    const ingresosTotales = await FetchTotalMountMoney();
    const TotalAmount = await FetchTotalAmount();
    const TopWaiter = await FetchUserWithMostInvoices();
    const OrdersToPending = await FetchOrdersToPending()

    return (
        <footer className="flex flex-wrap items-center gap-6 md:flex-nowrap gap-x-6 mb-6 w-full mt-6">
            <InformationBottomCards title="Ingresos Totales" data={ingresosTotales._sum.total_C_} money icon={<UpArrowIcon />} /> 
            <InformationBottomCards title="Ingresos por Mes" data={TotalAmount._sum.total_C_} money icon={<UpArrowIcon />} /> 
            <InformationBottomCards title="Mesero con mayor Ventas" data={TopWaiter.name} money={false} icon={<StarIcons />} /> 
            <InformationBottomCards title="Pedidos pendientes" data={OrdersToPending} money={false} icon={<UpArrowIcon />} /> 
        </footer>

    )
}