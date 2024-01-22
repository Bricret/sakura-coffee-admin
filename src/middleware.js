export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/dashboard',
        '/registerUser',
        '/dashboard/caja',
        '/dashboard/caja/NewOrder',
        '/dashboard/caja/pedidos',
        '/dashboard/caja/pedidos/NewOrderTo',
        '/dashboard/caja//cierre',
        '/dashboard/inventario',
        '/dashboard/inventario/newProduct',
        '/dashboard/reportes',
    ],
}