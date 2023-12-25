import NavCaja from "@/app/UI/caja/Nav-Caja";
import NavBar from "@/app/UI/dashboard/nav-bar";
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Caja | Sakura Coffee Shop',
  };
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <main>
            <header>
                <NavBar title="Caja " />
                <NavCaja />
            </header>
            <div>
                {children}
            </div>
        </main>
      )
}
