export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        '/dashboard',
        '/registerUser',
        '/dashboard/caja',
        '/dashboard/inventario',
        '/dashboard/reportes',
    ],
    
}