import { Icons } from "@/app/plugins/Icons";


const { CashRegisterIcon, DashBoardIcon, ReportIcon, InventoryIcon } = Icons;




export const Links = [
    {
        title: 'Dashboard',
        icon: DashBoardIcon,
        href: '/dashboard',
    },
    {
        title: 'Caja',
        icon: CashRegisterIcon,
        href: '/dashboard/caja',
    },
    {
        title: 'Inventario',
        icon: InventoryIcon,
        href: '/dashboard/inventario',
    },
    {
        title: 'Reportes',
        icon: ReportIcon,
        href: '/dashboard/reportes',
    },
];