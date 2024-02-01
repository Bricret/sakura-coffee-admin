import InformationCards from "../UI/dashboard/InformationCards";


export default function DashboardPage() {
    // TODO: Terminar de integrar las graficas y tarjetas de informacion.
    return (
        <header className="flex gap-x-6">
            <InformationCards title="Nuevas Facturas" data={320}  />
        </header>
    )
}