import { Metadata } from "next";
import SideNavHelp from "../UI/ayuda/SideNav-Help";

export const metadata: Metadata = {
    title: 'Ayuda | Sakura Coffee Shop',
  };
export default function AyudaLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <main className="flex h-screen flex-col md:flex-row">
      <section className="w-full flex-none md:w-60 hidden md:block">
          <SideNavHelp />
      </section>
      <article className="flex-grow p-6 md:overflow-y-auto md:p-6 bg-primary/50">
        { children }
      </article>
  </main>
      )
}