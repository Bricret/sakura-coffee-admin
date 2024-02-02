import FooterDashboard from "../UI/dashboard/FooterDashboard";
import GraphicsDashboard from "../UI/dashboard/GraphicDashboard";
import HeaderDashboard from "../UI/dashboard/HeaderDashboard";
import NavBar from "../UI/dashboard/nav-bar";


export default function DashboardPage() {

    return (
        <>
        <NavBar title="Bienvenid@ de nuevo " site />
        <HeaderDashboard />
        <main>
            <GraphicsDashboard />
        </main>
        <FooterDashboard />
        </>
    )
}