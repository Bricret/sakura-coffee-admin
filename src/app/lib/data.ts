import prisma from "./db";



export async function FetchRols() {
    try {
        const data = await prisma.rols.findMany();
        return data;
    } catch (error) {
        console.log('Error en la base de datos');
    }
}

export async function FetchUnicRols(id : number) {
    try {
        const data = await prisma.rols.findFirst({
            where: {
                id: id
            }
        });
        return data;
    } catch (error) {
        console.log('Error en la base de datos');
    }
}

export async function FetchCategorys() {
    try {
        const data = await prisma.categorias.findMany();
        return data;
    } catch (error) {
        console.log('Error en la base de datos');

    }
}

export async function FetchFilteredInventory(
    query : string,
    itemsPerPage : number,
    currentPage : number,
) {
    try {
        const skip = itemsPerPage * (currentPage - 1);
        
        const products = await prisma.productos.findMany({
            where: {
                nombre: {
                    contains: query,
                },
            },
            take: itemsPerPage,
            skip: skip,
        });
        return products;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchAllInventory() {
    try {
        const products = await prisma.productos.findMany();
        return products;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchInventoryPageCount(
    itemsPerPage : number,
) {
    try {
        const productsCount = await prisma.productos.count();
        const pageCount = Math.ceil(productsCount / itemsPerPage);
        return pageCount;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchUnicProduct(id : number) {
    try {
        const product = await prisma.productos.findFirst({
            where: {
                id: id
            }
        });
        return product;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchAllProductAvailability() {
    try {
        const product = await prisma.productos.findMany({
            where: {
                disponibilidad: 'disponible'
            }
        });
        const newPrice = product.map((item : any) => {
            return {
                ...item,
                precio: Number(item.precio)
            }
        })
        return newPrice;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchTables() {
    try {
        const tables = await prisma.mesas.findMany();
        return tables;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchOrdersByIdTable(idTable : any) {
    try {
        const orders = await prisma.ordens.findFirst({
            where: {
                mesa_id: idTable,
                estado: 'pendiente'
            }
        });
        return orders;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchDetailOrderByTable(idOrder : any) {
    try {
        const order = await prisma.detalle_ordens.findMany({
            where: {
                orden_id: idOrder
            }
        });
        return order;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchOrdersTo() {
    try {
        const orders = await prisma.pedidos.findMany();
        return orders;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchFilteredOrdersTo( query : string, itemsPerPage : number, currentPage : number ) { 
    try {
        const skip = itemsPerPage * (currentPage - 1);
        
        const OrdersTo = await prisma.pedidos.findMany({
            where: {
                nombre_cliente: {
                    contains: query,
                },
            },
            orderBy: {
                id: 'desc',
            },
            take: itemsPerPage,
            skip: skip,
        });
        return OrdersTo;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchOrdersToPageCount( itemsPerPage : number ) {
    try {
        const productsCount = await prisma.pedidos.count();
        const pageCount = Math.ceil(productsCount / itemsPerPage);
        return pageCount;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchOrdersToById(id : number) {
    try {
        const orders = await prisma.pedidos.findFirst({
            where: {
                id: id
            }
        });
        return orders;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchCaja() {
    try {
        const caja = await prisma.cajas.findMany();
        return caja;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchCajaActive() {
    try {
        const caja = await prisma.cajas.findFirst({
            where: {
                estado: 'abierto'
            }
        });
        return caja;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchCashFlow() {
    try {
        const cashFlow = await prisma.flujo_cajas.findFirst();
        return cashFlow;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchDetailOrderByOrderId(id : number) {
    try {
        const order = await prisma.detalle_ordens.findMany({
            where: {
                orden_id: id.toString()
            }
        });
        return order;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchInvoiceById(id : number) {
    try {
        const invoice = await prisma.facturas.findFirst({
            where: {
                id: id
            }
        });
        return invoice;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchUserById(id : number) {
    try {
        const user = await prisma.users.findFirst({
            where: {
                id: id.toString()
            }
        });
        return user;
    } catch (error : any) {
        throw new Error(error);
    }
}