export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/dashboard',
        '/registerUser',
        '/dashboard/caja',
        '/dashboard/inventario',
        '/dashboard/inventario/newProduct',
        '/dashboard/reportes',
    ],
    
}