import { Icons } from "@/app/plugins/Icons";


const { CashRegisterIcon, DashBoardIcon, ReportIcon, InventoryIcon } = Icons;




export const Links = [
    {
        title: 'Panel',
        icon: DashBoardIcon,
        href: '/dashboard',
    },
    {
        title: 'Caja',
        icon: CashRegisterIcon,
        href: '/dashboard/caja',
    },
    {
        title: 'Catalogo',
        icon: InventoryIcon,
        href: '/dashboard/inventario',
    },
    {
        title: 'Reportes',
        icon: ReportIcon,
        href: '/dashboard/reportes',
    },
];


export const LinkCaja = [
    {
        title: 'Caja',
        icon: CashRegisterIcon,
        href: '/dashboard/caja',
    },
    {
        title: 'Pedidos',
        icon: InventoryIcon,
        href: '/dashboard/caja/pedidos',
    },
    {
        title: 'Cierre',
        icon: ReportIcon,
        href: '/dashboard/caja/cierre',
    },
];


const styleFilters = "hover:bg-third/40 transition-all duration-300 ease-in-out"
export const filters = [
  {id: 1, title: "Categoria", style: styleFilters},
  {id: 2, title: "Preparado en", style: styleFilters},
  {id: 3, title: "Por disponibilidad", style: styleFilters},
];


export const TableColumns = [
    {
      key: "nombre",
      label: "NOMBRE",
    },
    {
      key: "precio",
      label: "PRECIO (C$)",
    },
    {
      key: "disponibilidad",
      label: "DISPONIBILIDAD",
    },
    {
        key: "preparado_en",
        label: "PREPARADO",
    },
    {
        key: "action",
        label: "MAS",
    },
  ];