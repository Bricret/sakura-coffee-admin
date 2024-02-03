import { revalidatePath } from "next/cache";


import prisma from "./db";



export async function FetchRols() {
    try {
        const data = await prisma.rols.findMany();
        return data;
    } catch (error) {
        console.log('Error en la base de datos');
    }
}

export async function FetchUnicRols(id: number) {
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
    query: string,
    itemsPerPage: number,
    currentPage: number,
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
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchAllInventory() {
    try {
        const products = await prisma.productos.count();
        return products;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchInventory() {
    try {
        const products = await prisma.productos.findMany();
        return products;
    } catch (error: any) {
        throw new Error(error);
    }
}


export async function FetchInventoryPageCount(
    itemsPerPage: number,
) {
    try {
        const productsCount = await prisma.productos.count();
        const pageCount = Math.ceil(productsCount / itemsPerPage);
        return pageCount;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchUnicProduct(id: number) {
    try {
        const product = await prisma.productos.findFirst({
            where: {
                id: id
            }
        });
        return product;
    } catch (error: any) {
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
        const newPrice = product.map((item: any) => {
            return {
                ...item,
                precio: Number(item.precio)
            }
        })
        return newPrice;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchTables() {
    try {
        const tables = await prisma.mesas.findMany();
        return tables;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchTablesActives() {
    try {
        const tables = await prisma.mesas.findMany({
            where: {
                estado: 'libre'
            }
        });
        return tables;
    } catch (error: any) {
        throw new Error(error);
    }

}

export async function FetchOrdersByIdTable(idTable: any) {
    try {
        const orders = await prisma.ordens.findFirst({
            where: {
                mesa_id: idTable,
                estado: 'pendiente'
            }
        });
        return orders;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchDetailOrderByTable(idOrder: any) {
    try {
        const order = await prisma.detalle_ordens.findMany({
            where: {
                orden_id: idOrder
            }
        });
        return order;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchOrdersTo() {
    try {
        const orders = await prisma.pedidos.count();
        return orders;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchFilteredOrdersTo(query: string, itemsPerPage: number, currentPage: number) {
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
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchOrdersToPageCount(itemsPerPage: number, query?: string) {
    try {
        let ordersCount;
        if (query === '') {
            ordersCount = await prisma.pedidos.count();
        } else {
            ordersCount = await prisma.pedidos.count({
                where: {
                    nombre_cliente: {
                        contains: query,
                    },
                },
            });
        }
        const pageCount = Math.ceil(ordersCount / itemsPerPage);
        return pageCount;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchOrdersToById(id: number) {
    try {
        const orders = await prisma.pedidos.findFirst({
            where: {
                id: id
            }
        });
        return orders;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchCaja() {
    try {
        const caja = await prisma.cajas.findMany();
        return caja;
    } catch (error: any) {
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
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchCashFlowByDate(dayDate?: any) {
    const actualDate = new Date().toISOString();
    let date = new Date(actualDate as string);
    date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    const openOnlyDate = date.toISOString().split('T')[0] + 'T00:00:00.000Z';
    try {
        const cashFlow = await prisma.flujo_cajas.findFirst({
            where: {
                fecha_apertura: dayDate || openOnlyDate
            }
        });
        revalidatePath('/dashboard/caja/cierre');
        return cashFlow;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchInvoiceById(id: number) {
    try {
        const Invoice = await prisma.facturas.findUnique({
            where: {
                id: id.toString(),
            },
            include: {
                users: true,
                ordens: {
                    include: {
                        detalle_ordens: {
                            include: {
                                productos: true,
                            }
                        },
                    }
                }
            }
        });
        return Invoice;
    } catch (error: any) {
        throw new Error(error);
    }
}


export async function FetchUserById(id: number) {
    try {
        const user = await prisma.users.findFirst({
            where: {
                id: id.toString()
            }
        });
        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchUserAll() {
    try {
        const user = await prisma.users.findMany();
        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchInvoiceByDate(fecha_apertura: any) {


    try {
        const invoice = await prisma.facturas.findMany({
            where: {
                fecha_emision: new Date(fecha_apertura)
            }
        });
        return invoice;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchInvoiceFiltered(query: string, itemsPerPage: number, currentPage: number, startDate?: any, endDate?: any) {

    try {
        const skip = itemsPerPage * (currentPage - 1);
        let Invoice;
       
        if (query === "") {
            Invoice = await prisma.facturas.findMany({
                orderBy: {
                    id: 'desc',
                },
                include: {
                    users: true,
                    ordens: {
                        include: {
                            detalle_ordens: {
                                include: {
                                    productos: true,
                                }

                            },
                        }
                    }
                },
                take: itemsPerPage,
                skip: skip,
            });
        } else {
            Invoice = await prisma.facturas.findMany({
                where: {
                    numero_factura: {
                        equals: BigInt(query),
                    },
                },
                include: {
                    users: true,
                    ordens: {
                        include: {
                            detalle_ordens: {
                                include: {
                                    productos: true,
                                }

                            },
                        }
                    }
                },
                orderBy: {
                    id: 'desc',
                },
                take: itemsPerPage,
                skip: skip,
            });
        }
        if (startDate && endDate) {
            let Startdate = new Date(startDate as string);
            Startdate.setUTCHours(0, 0, 0, 0);
            const editStartDate = Startdate.toISOString();

            let Enddate = new Date(endDate as string);
            Enddate.setUTCHours(0, 0, 0, 0);
            const editEndDate = Enddate.toISOString();

            Invoice = await prisma.facturas.findMany({
                where: {
                    fecha_emision: {
                        gte: editStartDate,
                        lte: editEndDate
                    },
                },
                orderBy: {
                    id: 'desc',
                },
                include: {
                    users: true,
                    ordens: {
                        include: {
                            detalle_ordens: {
                                include: {
                                    productos: true,
                                }

                            },
                        }
                    }
                },
                take: itemsPerPage,
                skip: skip,
            });
        }
        return Invoice;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchInvoicePageCount(itemsPerPage: number, startDate?: any, endDate?: any, query?: string) {
    try {
        let invoiceCount;
        if (query === '' && !startDate && !endDate) {
            invoiceCount = await prisma.facturas.count();
        } else if (startDate && endDate) {
            let Startdate = new Date(startDate as string);
            Startdate.setUTCHours(0, 0, 0, 0);
            const editStartDate = Startdate.toISOString();

            let Enddate = new Date(endDate as string);
            Enddate.setUTCHours(0, 0, 0, 0);
            const editEndDate = Enddate.toISOString();

            invoiceCount = await prisma.facturas.count({
                where: {
                    fecha_emision: {
                        gte: editStartDate,
                        lte: editEndDate
                    },
                },
            });
        } else {
            invoiceCount = await prisma.facturas.count({
                where: {
                    numero_factura: {
                        equals: BigInt(query || 2),
                    },
                },
            });
        }
        const pageCount = Math.ceil(invoiceCount / itemsPerPage);
        return {
            invoiceCount,
            pageCount
        };
    } catch (error: any) {
        throw new Error(error);
    }
    
}

export async function FetchAllInvoice() {
    try {
        const invoice = await prisma.facturas.count();
        return invoice;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchFlowCashFiltered( itemsPerPage: number, currentPage: number, startDate?: any, endDate?: any) {
    try {
        const skip = itemsPerPage * (currentPage - 1);
        let Invoice;
        if (startDate && endDate) {
            let Startdate = new Date(startDate as string);
            Startdate.setUTCHours(0, 0, 0, 0);
            const editStartDate = Startdate.toISOString();

            let Enddate = new Date(endDate as string);
            Enddate.setUTCHours(0, 0, 0, 0);
            const editEndDate = Enddate.toISOString();
            Invoice = await prisma.flujo_cajas.findMany({
                where: {
                    fecha_apertura: {
                        gte: editStartDate,
                        lte: editEndDate
                    },
                },
                orderBy: {
                    id: 'desc',
                },
                include: {
                    users: true,
                    cajas: true,
                },
                take: itemsPerPage,
                skip: skip,
                
            });
        } else {
            Invoice = await prisma.flujo_cajas.findMany({
                orderBy: {
                    id: 'desc',
                },
                include: {
                    users: true,
                    cajas: true,
                },
                take: itemsPerPage,
                skip: skip,
                
            });
        }
        return Invoice
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchFlowCashPageCount(itemsPerPage: number, startDate?: string, endDate?: string) {
    try {
        let invoiceCount;
        if (!startDate && !endDate) {
            invoiceCount = await prisma.flujo_cajas.count();
        } else if (startDate && endDate) {
            let Startdate = new Date(startDate as string);
            Startdate.setUTCHours(0, 0, 0, 0);
            const editStartDate = Startdate.toISOString();

            let Enddate = new Date(endDate as string);
            Enddate.setUTCHours(0, 0, 0, 0);
            const editEndDate = Enddate.toISOString();

            invoiceCount = await prisma.flujo_cajas.count({
                where: {
                    fecha_apertura: {
                        gte: editStartDate,
                        lte: editEndDate
                    },
                },
            });
        } 
        const pageCount = Math.ceil(invoiceCount / itemsPerPage);
        return {
            invoiceCount,
            pageCount
        };
    } catch (error: any) {
        throw new Error(error);
    }
    
}

export async function FetchProductsSoldByCategory() {
    try {
        // Primera consulta: agrupar por producto_id y sumar la cantidad
    const detalleOrdensAgrupados = await prisma.detalle_ordens.groupBy({
        by: ['producto_id'],
        _sum: {
          cantidad: true,
        },
      });
    
      // Segunda consulta: obtener los categoria_id de los productos
      const productos = await prisma.productos.findMany({
        where: {
          id: {
            in: detalleOrdensAgrupados.map((item : any) => item.producto_id),
          },
        },
        select: {
          id: true,
          categoria_id: true,
        },
      });
    
      // Tercera consulta: obtener los nombres de las categorías
      const categorias = await prisma.categorias.findMany({
        where: {
          id: {
            in: productos.map((p : any) => p.categoria_id),
          },
        },
        select: {
          id: true,
          nombre: true,
        },
      });
    
      // Mapa para acumular cantidades por categoría
      const acumuladoPorCategoria: { [key: string]: number } = {};
    
      // Combinar los resultados y sumar las cantidades por categoría
      detalleOrdensAgrupados.forEach((item : any) => {
        const categoriaId = productos.find((p : any ) => p.id === item.producto_id)?.categoria_id;
        const categoriaNombre = categorias.find((c : any) => c.id === categoriaId)?.nombre;
        if (categoriaNombre) {
          if (!acumuladoPorCategoria[categoriaNombre]) {
            acumuladoPorCategoria[categoriaNombre] = 0;
          }
          acumuladoPorCategoria[categoriaNombre] += item._sum.cantidad;
        }
      });
    
      // Convertir el mapa acumulado en un array de objetos para la salida final
      const productosVendidosPorCategoria = Object.entries(acumuladoPorCategoria).map(([categoria, cantidad]) => ({
        categoria,
        cantidad,
      }));
      return productosVendidosPorCategoria;
    } catch (error : any) {
        throw new Error(error)
    }
}

export async function FetchMostSoldProduct() {
    try {
        // Primera consulta para obtener el ID del producto más vendido
        const mostSoldProduct = await prisma.detalle_ordens.groupBy({
            by: ['producto_id'],
            _sum: {
              cantidad: true,
            },
            orderBy: {
              _sum: {
                cantidad: 'desc',
              },
            },
            take: 1,
        });

        const productoId = mostSoldProduct[0].producto_id;
        const productoInfo = await prisma.productos.findUnique({
            where: {
                id: productoId,
            },
            select: {
                nombre: true, 
            },
        });

        return {
            ...mostSoldProduct[0],
            nombreProducto: productoInfo ? productoInfo.nombre : null,
        };
    } catch (error : any ) {
        throw new Error(error);
    }
}


export async function FetchTotalSoldProducts() {
    const totalSold = await prisma.detalle_ordens.aggregate({
      _sum: {
        cantidad: true,
      },
    });
  
    return totalSold._sum.cantidad;
}

export async function FetchCountInvoiceForDay() {

    const actualDate = new Date().toISOString();
    let emisionDate = new Date(actualDate as string);
    emisionDate = new Date(emisionDate.getTime() - emisionDate.getTimezoneOffset() * 60 * 1000);
    let newDate = (emisionDate.toISOString()).split('T')[0];
    newDate = newDate + 'T00:00:00.000Z'

  try {
      const invoices = await prisma.facturas.count({
        where: {
          fecha_emision: newDate
        },
      });
      return invoices
  } catch (error : any) {
    throw new Error(error)
  }
}

export async function FetchInvoicesCurrentMonth() {
    const currentDate = new Date();
    let firstDayOfMonth = ((new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)).toISOString()).split('T')[0];
    firstDayOfMonth = firstDayOfMonth  +  'T00:00:00.000Z'
    let lastDayOfMonth = ((new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)).toISOString()).split('T')[0];
    lastDayOfMonth = lastDayOfMonth + 'T00:00:00.000Z'
  
    const invoices = await prisma.facturas.count({
      where: {
        fecha_emision: {
          gte: firstDayOfMonth,
          lte: lastDayOfMonth,
        },
      },
    });
  
    return invoices;
}

export async function FetchTotalMountMoney() {
    try {
        const total_C_ = await prisma.facturas.aggregate({
            _sum: {
              total_C_: true
            },
          });
          return total_C_
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchTotalAmount() {
    const currentDate = new Date();
    let firstDayOfMonth = ((new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)).toISOString()).split('T')[0];
    firstDayOfMonth = firstDayOfMonth  +  'T00:00:00.000Z';
    let lastDayOfMonth = ((new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)).toISOString()).split('T')[0];
    lastDayOfMonth = lastDayOfMonth + 'T00:00:00.000Z';
  
    try {
        const total_C_ = await prisma.facturas.aggregate({
          _sum: {
            total_C_: true,
          },
          where: {
            fecha_emision: {
              gte: new Date(firstDayOfMonth),
              lte: new Date(lastDayOfMonth),
            },
          },
        });
        return total_C_
    } catch ( error : any ) {
        throw new Error(error)
    }
}

export async function FetchUserWithMostInvoices() {
    try {
        const userWithMostInvoices = await prisma.facturas.groupBy({
            by: ['user_id'],
            _count: {
              user_id: true,
            },
            orderBy: {
              _count: {
                user_id: 'desc',
              },
            },
            take: 1,
          });
        
          if (userWithMostInvoices.length > 0) {
            const userId = userWithMostInvoices[0].user_id;
            const user = await prisma.users.findUnique({
              where: {
                id: userId,
              },
            });
            return user;
        }
    } catch (error : any) {
        throw new Error(error)
    }
}

export async function FetchOrdersToPending() {
    try {
        const pendingOrders = await prisma.pedidos.count({
            where: {
                estado_pedido: 'pendiente',
            },
        });
        
        return pendingOrders;
    } catch (error : any) {
        throw new Error(error)
    }
}