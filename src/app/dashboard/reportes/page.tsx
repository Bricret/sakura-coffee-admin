import NavBar from "@/app/UI/dashboard/nav-bar";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Reportes | Sakura Coffee Shop',
  };

export default function ReportsPage() {
    return (
        <NavBar title={"Reportes de Movimiento"}/>
    )
}