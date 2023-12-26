import { PrincipalNavbarSkeleton } from "@/app/UI/Skeleton";
import NavCaja from "@/app/UI/caja/Nav-Caja";
import NavBar from "@/app/UI/dashboard/nav-bar";
import { Metadata } from "next"
import { Suspense } from "react";

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
                <Suspense fallback={ <PrincipalNavbarSkeleton /> }>
                  <NavBar title="Transacciones " />
                </Suspense>
                <NavCaja />
            </header>
            <div>
                {children}
            </div>
        </main>
      )
}
