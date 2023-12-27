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
        return product;
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