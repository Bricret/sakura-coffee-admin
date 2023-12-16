import { Metadata } from "next"
import SideNav from "../UI/dashboard/SideNav";

export const metadata: Metadata = {
    title: 'Dashboard | Sakura Coffee Shop',
  };
export default function DashboardLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
            <div className="w-full flex-none md:w-56">
                <SideNav />
            </div>
            <div className="flex-grow p-6 md:overflow-y-auto md:p-12 bg-primary/50">{ children }</div>
        </div>
      )
}
