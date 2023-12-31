import { Icons } from "@/app/plugins/Icons";


const { CashRegisterIcon, DashBoardIcon, ReportIcon, InventoryIcon, OrderIcon, CloseIcon, TableIcon } = Icons;




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
        title: 'Mesas',
        icon: TableIcon,
        href: '/dashboard/caja',
    },
    {
        title: 'Pedidos',
        icon: OrderIcon,
        href: '/dashboard/caja/pedidos',
    },
    {
        title: 'Cierre',
        icon: CloseIcon,
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

export const TableColumsCash = [
    {
        key: "ubicacion",
        label: "UBICACION",
    },
    {
        key: "estado",
        label: "ESTADO",
    },
    {
        key: "action",
        label: "ACCIONES",
    },
];

export const TableColumsDetailsOrders = [
    {
        key: "nombre",
        label: "NOMBRE",
    },
    {
        key: "cantidad",
        label: "CANTIDAD",
    },
    {
        key: "monto_C_",
        label: "MONTO C$",
    },
    {
        key: "monto_U_",
        label: "MONTO U$",
    },
    {
        key: "action",
        label: "ACCIONES",
    },

]

export const TableColumsDetailsOrdersView = [
    {
        key: "nombre",
        label: "NOMBRE",
    },
    {
        key: "cantidad",
        label: "CANTIDAD",
    },
    {
        key: "monto_C_",
        label: "MONTO C$",
    },
    {
        key: "monto_U_",
        label: "MONTO U$",
    },
]

export const TableColumsOrdersTo = [
    {
        key: "nombre",
        label: "NOMBRE",
    },
    {
        key: "estado_pago",
        label: "ESTADO PAGO",
    },
    {
        key: "estado_pedido",
        label: "ESTADO PEDIDO",
    },
    {
        key: "fecha",
        label: "FECHA ENTREGA",
    },
    {
        key: "action",
        label: "ACCIONES",
    },

]