import GenerateButton from "@/app/UI/caja/cierre/CloseCaja";
import NavBar from "@/app/UI/dashboard/nav-bar";
import { FetchSoldProductsToday } from "@/app/lib/data";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Reportes | Sakura Coffee Shop',
  };

export default async function ReportsPage() {

    const allProductsPayToday = await FetchSoldProductsToday();


    return (
    <>
        <NavBar title={"Reportes de Movimiento"}/>
        <GenerateButton Products={allProductsPayToday}/>
        
    </>
    )
}