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

export const TableNominationNationalBanknote = [
    {
        name: "C5",
        label: "Billetes de 5",
        montoid: "monto_Billete_C$5",
        factor: 5,
    },
    {
        name: "C10",
        label: "Billetes de 10",
        montoid: "monto_Billete_C$10",
        factor: 10,
    },
    {
        name: "C20",
        label: "Billetes de 20",
        montoid: "monto_Billete_C$20",
        factor: 20,
    },
    {
        name: "C50",
        label: "Billetes de 50",
        montoid: "monto_Billete_C$50",
        factor: 50,
    },
    {
        name: "C100",
        label: "Billetes de 100",
        montoid: "monto_Billete_C$100",
        factor: 100,
    },
    {
        name: "C200",
        label: "Billetes de 200",
        montoid: "monto_Billete_C$200",
        factor: 200,
    },
    {
        name: "C500",
        label: "Billetes de 500",
        montoid: "monto_Billete_C$500",
        factor: 500,
    },
    {
        name: "C1000",
        label: "Billetes de 1000",
        montoid: "monto_Billete_C$1000",
        factor: 1000,
    },
]

export const TableNominationNationalCoin = [
    {
        name: "C_0.50",
        label: "Monedas de 50 centavos",
        montoid: "monto_Moneda_C$0.50",
        factor: 0.50,
    },
    {
        name: "C_1",
        label: "Monedas de 1",
        montoid: "monto_Moneda_C$1",
        factor: 1,
    },
    {
        name: "C_5",
        label: "Monedas de 5",
        montoid: "monto_Moneda_C$5",
        factor: 5,
    },
]

export const TableNominationDolarsBanknote = [
    {
        name: "$1",
        label: "Billetes de 1",
        montoid: "monto_Billete_U$_1",
        factor: 1,
    },
    {
        name: "$2",
        label: "Billetes de 2",
        montoid: "monto_Billete_U$_2",
        factor: 2,
    },
    {
        name: "$5",
        label: "Billetes de 5",
        montoid: "monto_Billete_U$_5",
        factor: 5,
    },
    {
        name: "$10",
        label: "Billetes de 10",
        montoid: "monto_Billete_U$_10",
        factor: 10,
    },
    {
        name: "$20",
        label: "Billetes de 20",
        montoid: "monto_Billete_U$_20",
        factor: 20,
    },
]

export const TableNominationCardCash = [
    {
        name: "CardCash",
        label: "Cordobas",
        montoid: "monto_C$",
        factor: 1,
    },
]