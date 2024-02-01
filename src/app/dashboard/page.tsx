import InformationCards from "../UI/dashboard/InformationCards";
import NavBar from "../UI/dashboard/nav-bar";


export default function DashboardPage() {
    // TODO: Terminar de integrar las graficas y tarjetas de informacion.
    return (
        <>
        <NavBar title={"Bienvenid@ de nuevo "} site={true}/>
        <header className="flex gap-x-6">
            <InformationCards title="Nuevas Facturas" style1="border-b-blue-500" style2="bg-blue-100" data={100}  />
            <InformationCards title="Facturas Mensuales" style1="border-b-red-500" style2="bg-red-100" data={110}  />
            <InformationCards title="Facturas Totales" style1="border-b-orange-500" style2="bg-orange-100" data={500}  />
            <InformationCards title="Pedidos Realizados" style1="border-b-green-500" style2="bg-green-100" data={70}  />
        </header>

        </>
    )
}