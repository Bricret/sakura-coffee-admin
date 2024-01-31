import { PrincipalNavbarSkeleton } from "@/app/UI/Skeleton";
import NavBar from "@/app/UI/dashboard/nav-bar";
import Nav_Reportes from "@/app/UI/reportes/Nav-Reportes";
import { Metadata } from "next";
import { Suspense } from "react";


export const metadata: Metadata = {
    title: 'Reportes | Sakura Coffee Shop',
  };


export default function ReportesLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <main>
            <header>
                <Suspense fallback={ <PrincipalNavbarSkeleton /> }>
                <NavBar title={"Reportes de Movimiento"}/>
                </Suspense>
                <Nav_Reportes />
            </header>
            <section>
                {children}
            </section>
        </main>
      )
}