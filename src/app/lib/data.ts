import prisma from "./db";



export async function FetchRols() {
    try {
        const data = await prisma.rols.findMany();
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