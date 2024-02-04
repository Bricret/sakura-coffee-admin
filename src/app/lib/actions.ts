'use server';

import { revalidatePath } from "next/cache";
import { IncriptPass } from "../plugins/incript/argon2";
import { CreateProductFormSchema, CreateUserFormSchema, UpdateProductFormSchema } from "../plugins/zod";
import prisma from "./db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function createUser(formData: FormData) {
    const { userName, password, rol } = CreateUserFormSchema.parse({
        userName: formData.get('username'),
        password: formData.get('password'),
        rol: formData.get('selectRol')
    });

    const PassIncript = await IncriptPass(password);

    const userFound = await prisma.users.findFirst({
        where: {
            name: userName
        }
    });

     if (userFound) {
        return { success: false, message: 'Usuario ya existe en la base de datos' }
     }; 

    try {
        await prisma.users.create({
            data: {
                name: userName,
                password: PassIncript,
                rol_id: rol
            }
        });
        return { success: true, message: 'Usuario creado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Usuario no creado correctamente' }
    }
}

export async function updateUser(formData: FormData) {
        const selectUser = formData.get('selectUser')
        const selectRol = formData.get('selectRol')
        let state = formData.get('state')
        const password = formData.get('password');

    const userFound = await prisma.users.findFirst({
        where: {
            id: selectUser?.toString()
        }
    });

    if (!userFound) {
        return { success: false, message: 'Usuario no existe en la base de datos' }
    };

    try {
        await prisma.users.update({
            where: {
                id: selectUser?.toString()
            },
            data: {
                rol_id: selectRol,
                status: state ? true : false
            }
        });
        if (password !== '') {
            const PassIncript = await IncriptPass(password as string);
            await prisma.users.update({
                where: {
                    id: selectUser?.toString()
                },
                data: {
                    password: PassIncript
                }
            });
        }
        return { success: true, message: 'Usuario actualizado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Usuario no actualizado correctamente' }
    }

}

export async function createProduct(formData: FormData) {
    const rawFormData = Object.fromEntries(formData.entries());
    const { nombre, descripcion, precio, preparado_en, categoria, disponibilidad } = CreateProductFormSchema.parse(rawFormData);
    const productFound = await prisma.productos.findFirst({
        where: {
            nombre: nombre
        }
    });
    if (productFound) {
        return { success: false, message: 'Producto ya existe en la base de datos' }
    };
    try {
        await prisma.productos.create({
            data: {
                nombre: nombre,
                descripcion: descripcion,
                precio: Number(precio),
                preparado_en: preparado_en,
                categoria_id: categoria,
                disponibilidad: disponibilidad
            }
        });
        revalidatePath('/dashboard/inventario');
        return { success: true, message: 'Producto creado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Producto no fue creado correctamente' }
    }

}

export async function updateProduct(formData: FormData, id: string) {
    const rawFormData = Object.fromEntries(formData.entries());
    const { nombre, descripcion, precio, preparado_en, categoria, disponibilidad } = UpdateProductFormSchema.parse(rawFormData);

    const productFound = await prisma.productos.findFirst({
        where: {
            nombre: nombre
        }
    });

    if(!productFound || productFound.id === id) {
        try {
            await prisma.productos.update({
                where: {
                    id: id
                },
                data: {
                    nombre: nombre,
                    descripcion: descripcion,
                    precio: Number(precio),
                    preparado_en: preparado_en,
                    categoria_id: categoria,
                    disponibilidad: disponibilidad
                }
            });
            revalidatePath('/dashboard/inventario');
            return { success: true, message: 'Producto actualizado correctamente' }
        } catch ( error : any ) {
           console.log('error', error);
           return { success: false, message: 'Producto no fue actualizado correctamente' }
        }
    } else {
        return { success: false, message: 'Producto ya existe en la base de datos' }
    }
}

export async function deleteProduct( id : string ) {
    try {
        await prisma.productos.delete({
            where: {
                id: id.toString()
            }
        });
        revalidatePath('/dashboard/inventario');
        return { success: true, message: 'Producto eliminado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Producto no fue eliminado correctamente' }
    }
}

export async function createNewOrderByTable(idTable : string) {
    try {
        const orderFound = await prisma.ordens.findFirst({
            where: {
                mesa_id: idTable,
                estado: 'pendiente'
            }
        });
        if (orderFound) {
            return { success: false, message: 'Orden ya existe en la base de datos', data: orderFound }
        };

        const newOrder = await prisma.ordens.create({
            data: {
                mesa_id: idTable.toString(),
                sub_total_C_: 0,
                sub_total_U_: 0,
                estado: 'pendiente'
            }
        });
        return { success: true, message: 'Orden creada correctamente', data: newOrder }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Error al intentar crear la orden' }
    }
}

export async function createNewOrdersByOrderTo(idOrderTo : any,  total : any) {
    try {
        const orderFound = await prisma.ordens.findFirst({
            where: {
                pedido_id: idOrderTo,
                estado: 'pendiente'
            }
        });
        if (orderFound) {
            return { success: false, message: 'Orden ya existe en la base de datos', data: orderFound }
        };
        const total_U_ = parseFloat((total / parseFloat(process.env.NEXT_PUBLIC_CONVERSION_RATE as string)).toFixed(2));

        const newOrder = await prisma.ordens.create({
            data: {
                pedido_id: idOrderTo.toString(),
                sub_total_C_: Number(total),
                sub_total_U_: total_U_,
                estado: 'pendiente'
            }
        });
        return { success: true, message: 'Orden creada correctamente', data: newOrder }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Error al intentar crear la orden' }
    }
 }

 export async function createNewOrder() {
    const OrderFound = await prisma.ordens.findFirst({
        where: {
            estado: 'pendiente',
            mesa_id: null,
            pedido_id: null
        }
    });
    if (OrderFound) {
        return { success: false, message: 'Orden ya existe en la base de datos', data: OrderFound }
    };

    try {
        const newOrder = await prisma.ordens.create({
            data: {
                sub_total_C_: 0,
                sub_total_U_: 0,
                estado: 'pendiente'
            }
        });
        return { success: true, message: 'Orden creada correctamente', data: newOrder }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Error al intentar crear la orden' }
    }
 }

export async function updateOrderByTable(idOrder: any, subTotalC: number, subTotalU: number, idTable: any) {

    try {
        const updateOrder = await prisma.ordens.update({
            where: {
                id: idOrder.toString()
            },
            data: {
                sub_total_C_: subTotalC,
                sub_total_U_: subTotalU
            }
        });

        if (updateOrder) {
            try {
                await prisma.mesas.update({
                    where: {
                        id: idTable
                    },
                    data: {
                        estado: 'ocupada'
                    }
                });
            } catch (error) {
                throw new Error('Error al intentar actualizar la mesa');
            }
        }
        revalidatePath(`/dashboard/caja`);
        return { success: true, message: 'Orden actualizada correctamente', data: updateOrder }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Orden no fue actualizada correctamente', data: error }
    }
}

export async function updateOrder( idOder : any, subTotalC : number, subTotalU : number ) {

    try {
        const updateOrder = await prisma.ordens.update({
            where: {
                id: idOder.toString()
            },
            data: {
                sub_total_C_: subTotalC,
                sub_total_U_: subTotalU
            }
        });
        revalidatePath(`/dashboard/caja/newOrder`);
        return { success: true, message: 'Orden actualizada correctamente', data: updateOrder }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Orden no fue actualizada correctamente', data: error }
    }
}

export async function updateOrderToFinish( idOrder : any ) {
    try {
        await prisma.ordens.update({
            where: {
                id: idOrder.toString()
            },
            data: {
                estado: 'finalizada'
            }
        });
        revalidatePath(`/dashboard/caja`);
        return { success: true, message: 'Orden actualizada correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Orden no fue actualizada correctamente' }
    }
}

export async function getOrdersPendingByTable( idMesa? : string ) {

    const OrdersPending = await prisma.ordens.count({
        where : {
            mesa_id: idMesa,
            estado: 'pendiente'
        }
    })
    return OrdersPending
} 

export async function updateOrderToFinishByTable( idOrder : any, idTable : any ) {
    try {
        await prisma.ordens.update({
            where: {
                id: idOrder
            },
            data: {
                estado: 'finalizada'
            }
        });
        await prisma.mesas.update({
            where: {
                id: idTable
            },
            data: {
                estado: 'libre'
            }
        });
        revalidatePath(`/dashboard/caja`);
        return { success: true, message: 'Orden actualizada correctamente' }
    } catch ( error : any ) {
    console.log('error', error);
    return { success: false, message: 'Orden no fue actualizada correctamente' }
    }
}
 
export async function createNewDetailOrderByTable(formData: FormData, idOrder: string, products: any, idTable: string) {

    const rawFormData = Object.fromEntries(formData.entries());
    const findProduct =  products.find((product: any) => product.nombre === rawFormData.product);

    const orderFound = await prisma.detalle_ordens.findFirst({
        where: {
            producto_id: findProduct.id,
            orden_id: idOrder
        }
    });

    if (orderFound) {
        return { success: false, message: 'Producto ya existe en la orden' }
    };

    const cantidad = Number(rawFormData.cantidad)
    const monto_C_ = cantidad * findProduct.precio;
    const monto_U_ = parseFloat((monto_C_ / parseFloat(process.env.NEXT_PUBLIC_CONVERSION_RATE as string)).toFixed(2));

    try {
        await prisma.detalle_ordens.create({
            data: {
                orden_id: idOrder,
                producto_id: findProduct.id,
                cantidad: cantidad,
                monto_C_: monto_C_,
                monto_U_: monto_U_
            }
        });
        revalidatePath(`/dashboard/caja/newOrder/${idTable}/create`);
        return { success: true, message: 'Producto agregado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Producto no fue agregado correctamente', data: error }
    }
}

export async function createNewDetailOrder(formData: FormData, idOrder: string, products: any) {
    
        const rawFormData = Object.fromEntries(formData.entries());
        const findProduct =  products.find((product: any) => product.nombre === rawFormData.product);
    
        const orderFound = await prisma.detalle_ordens.findFirst({
            where: {
                producto_id: findProduct.id,
                orden_id: idOrder
            }
        });
    
        if (orderFound) {
            return { success: false, message: 'Producto ya existe en la orden' }
        };
    
        const cantidad = Number(rawFormData.cantidad)
        const monto_C_ = cantidad * findProduct.precio;
        const monto_U_ = parseFloat((monto_C_ / parseFloat(process.env.NEXT_PUBLIC_CONVERSION_RATE as string)).toFixed(2));
    
        try {
            await prisma.detalle_ordens.create({
                data: {
                    orden_id: idOrder,
                    producto_id: findProduct.id,
                    cantidad: cantidad,
                    monto_C_: monto_C_,
                    monto_U_: monto_U_
                }
            });
            revalidatePath(`/dashboard/caja/newOrder/create`);
            return { success: true, message: 'Producto agregado correctamente' }
        } catch ( error : any ) {
        console.log('error', error);
        return { success: false, message: 'Producto no fue agregado correctamente', data: error }
        }
    
}

export async function deleteDetailOrder( id: string, orderId: any, idTable: any ) {
    try {
        await prisma.detalle_ordens.delete({
            where: {
                id: id.toString(),
                orden_id: orderId.toString(),
            }
        });
        revalidatePath(`/dashboard/caja/newOrder/${idTable}`);
        return { success: true, message: 'Producto eliminado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Producto no fue eliminado correctamente' }
    }
}

export async function updateDetailOrder( id: string, formData: FormData, product : any, idTable: any) {

    const rawFormData = Object.fromEntries(formData.entries());
    const { cantidad } = rawFormData;

    const orderFound = await prisma.detalle_ordens.findFirst({
        where: {
            id: id
        }
    });

    if (!orderFound) {
        return { success: false, message: 'Producto no existe en la orden' }
    };

    const monto_C_ = Number(cantidad) * product.precio;
    const monto_U_ = parseFloat((monto_C_ / parseFloat(process.env.NEXT_PUBLIC_CONVERSION_RATE as string)).toFixed(2));

    try {
        await prisma.detalle_ordens.update({
            where: {
                id: id
            },
            data: {
                cantidad: Number(cantidad),
                monto_C_: monto_C_,
                monto_U_: monto_U_,
                impreso: false
            }
        });
        revalidatePath(`/dashboard/caja/newOrder/${idTable}`);
        return { success: true, message: 'Producto actualizado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Producto no fue actualizado correctamente' }
    }
    
}

export async function getUnprintedOrderDetailsById(id : string) {
    try {
        const unprintedOrderDetails = await prisma.detalle_ordens.count({
            where: {
              orden_id : id,
              impreso: false,
            },
          });
          return unprintedOrderDetails;
    } catch (error : any) {
        throw new Error(error);
    }
  }

export async function updateOderTable( formData : FormData, infoOder : any ) {
    const table = formData.get('table');
    const {id, mesa_id} = infoOder[0];
    try {
        const BusyTable = await prisma.mesas.findFirst({
            where: {
                nombre: table,
                estado: 'ocupada'
            }
        });
    if (BusyTable) return { success: false, message: 'La mesa ya esta ocupada' }

    const tableFind = await prisma.mesas.findFirst({
        where: {
            nombre: table
        }
    });

    await prisma.mesas.update({
        where: {
            id: tableFind.id.toString()
        },
        data: {
            estado: 'ocupada'
        }
    });

    await prisma.mesas.update({
        where: {
            id: mesa_id.toString()
        },
        data: {
            estado: 'libre'
        }
    });

    await prisma.ordens.update({
        where: {
            id: id.toString()
        },
        data: {
            mesa_id: tableFind.id.toString()
        }
    });
    revalidatePath(`/dashboard/caja`);
    return { success: true, message: 'Cambio de mesa actualizado correctamente.' }

    } catch ( error : any ) {
    console.log('error', error);
    return { success: false, message: 'Orden no fue actualizada correctamente' }
    }
}

export async function createNewInvoiceByTable(Order : any, TypePay : any ) {

    const session = await getServerSession(authOptions);
    const client = session?.user?.name;
    const actualDate = new Date().toISOString();
    let emisionDate = new Date(actualDate as string);
    emisionDate = new Date(emisionDate.getTime() - emisionDate.getTimezoneOffset() * 60 * 1000);
    const propina_C =parseFloat((Order.sub_total_C_ * 0.10).toFixed(2));
    const propina_U = parseFloat((propina_C / parseFloat(process.env.NEXT_PUBLIC_CONVERSION_RATE as string)).toFixed(2));
    const total_C = Order.sub_total_C_ + propina_C;
    const total_U = Order.sub_total_U_ + propina_U;

    // Busca el usuario que esta logueado 
    const userFound = await prisma.users.findFirst({
        where: {
            name: client
        }
    });

    const findInvoice = await prisma.facturas.findFirst({
        where: {
            orden_id: Order.id
        }
    });

    if (findInvoice) {
        return { success: true, message: 'Factura ya existe en la base de datos', data: findInvoice }
    };

    if (userFound.status === 'inactivo') return { success: false, message: 'Usuario Inactivo, nisiquiera deberias poder hacer esto.' }

    // Busca el ultimo numero de factura
    const lastInvoice = await prisma.facturas.findFirst({
        orderBy: {
            numero_factura: 'desc'
        }
    });
    
    let numInvoice = 1;
    if (lastInvoice) {
        numInvoice = Number(lastInvoice.numero_factura) + 1;
    }

    // Crea la factura con los datos de la orden
    try {
        const newInvoice = await prisma.facturas.create({
            data: {
                numero_factura: numInvoice.toString(),
                fecha_emision: emisionDate,
                hora_emision: emisionDate,
                metodo_pago: TypePay,
                user_id: userFound?.id,
                propina_C_: propina_C,
                propina_U_: propina_U,
                descuento_C_: 0, //el descuento aun no se implementa pero se deja por si acaso
                descuento_U_: 0,
                total_C_: total_C,
                total_U_: total_U,
                orden_id: Order.id
            }
        });
        return { success: true, message: 'Factura creada correctamente', data: newInvoice}
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Error al intentar crear la factura' }
    }
}

export async function createNewInvoice( Order : any, TypePay : any ) {
    
    const session = await getServerSession(authOptions);
    const client = session?.user?.name;
    const actualDate = new Date().toISOString();
    let emisionDate = new Date(actualDate as string);
    emisionDate = new Date(emisionDate.getTime() - emisionDate.getTimezoneOffset() * 60 * 1000);
    const propina_C =parseFloat((Order.sub_total_C_ * 0.10).toFixed(2));
    const propina_U = parseFloat((propina_C / parseFloat(process.env.NEXT_PUBLIC_CONVERSION_RATE as string)).toFixed(2));
    const total_C = Order.sub_total_C_ + propina_C;
    const total_U = Order.sub_total_U_ + propina_U;

    // Busca el usuario que esta logueado 
    const userFound = await prisma.users.findFirst({
        where: {
            name: client
        }
    });

    if (userFound.status === 'inactivo') return { success: false, message: 'Usuario Inactivo, nisiquiera deberias poder hacer esto.' }

    // Generar numero de factura
    const lastInvoice = await prisma.facturas.findFirst({
        orderBy: {
            numero_factura: 'desc'
        }
    });
    
    let numInvoice = 1;
    if (lastInvoice) {
      numInvoice = Number(lastInvoice.numero_factura) + 1;
    }

    // Crea la factura con los datos de la orden
    try {
        const newInvoice = await prisma.facturas.create({
            data: {
                numero_factura: numInvoice,
                fecha_emision: emisionDate,
                hora_emision: emisionDate,
                metodo_pago: TypePay,
                user_id: userFound?.id,
                propina_C_: propina_C,
                propina_U_: propina_U,
                descuento_C_: 0, //el descuento aun no se implementa pero se deja por si acaso
                descuento_U_: 0,
                total_C_: total_C,
                total_U_: total_U,
                orden_id: Order.id
            }
        });
        revalidatePath(`/dashboard/caja`);
        return { success: true, message: 'Factura creada correctamente', data: newInvoice}
    } catch ( error : any ) {
    console.log('error', error);
    return { success: false, message: 'Error al intentar crear la factura' }
    }
}

export async function updateInvoice( idInvoice : any, newTotal : number, orderId : any ) {

    const total_U_ = parseFloat((newTotal / parseFloat(process.env.NEXT_PUBLIC_CONVERSION_RATE as string)).toFixed(2));

    try {
        const newInvoice = await prisma.facturas.update({
            where: {
                id: idInvoice.toString()
            },
            data: {
                total_C_: newTotal,
                total_U_: total_U_,
                propina_C_: 0,
                propina_U_: 0,
            }
        });
        if (newInvoice) {
            try {
                await prisma.ordens.update({
                    where: {
                        id: orderId
                    },
                    data: {
                        estado: 'finalizada'
                    }
                });
            } catch (error) {
                throw new Error('Error al intentar actualizar la orden');
            }
        }

        revalidatePath(`/dashboard/caja`);
        return { success: true, message: 'Factura actualizada correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Factura no fue actualizada correctamente' }
    }

}

export async function updateInvoiceByTable( idInvoice : any, newTotal : number, orderId : any, idTable : any ) {
    
    const total_U_ = parseFloat((newTotal / parseFloat(process.env.NEXT_PUBLIC_CONVERSION_RATE as string)).toFixed(2));

    try {
        const newInvoice = await prisma.facturas.update({
            where: {
                id: idInvoice.toString()
            },
            data: {
                total_C_: newTotal,
                total_U_: total_U_,
                propina_C_: 0,
                propina_U_: 0,
            }
        });
        if (newInvoice) {
            try {
                await prisma.ordens.update({
                    where: {
                        id: orderId
                    },
                    data: {
                        estado: 'finalizada'
                    }
                });
                await prisma.mesas.update({
                    where: {
                        id: idTable
                    },
                    data: {
                        estado: 'libre'
                    }
                });
            } catch (error) {
                throw new Error('Error al intentar actualizar la orden');
            }
        }

        revalidatePath(`/dashboard/caja`);
        return { success: true, message: 'Factura actualizada correctamente' }
    } catch ( error : any ) {
    console.log('error', error);
    return { success: false, message: 'Factura no fue actualizada correctamente' }
    }

}

export async function createNewOrderTo( formData : FormData ) {

    const rawFormData = Object.fromEntries(formData.entries());
    const fecha_entrega = formData.get('fecha_entrega');
    const fecha_pedido = new Date().toISOString();
    let entregaDate = new Date(fecha_entrega as string);
    entregaDate = new Date(entregaDate.getTime() - entregaDate.getTimezoneOffset() * 60 * 1000);
    let estado_pago = 'pendiente';

    if (rawFormData.anticipo === rawFormData.total) {
        estado_pago = 'cancelado';
    }
        try {
            const data = await prisma.pedidos.create({
                data: {
                    nombre_cliente: rawFormData.nombre,
                    direccion_cliente: rawFormData.direccion_cliente,
                    anticipo: Number(rawFormData.anticipo),
                    total: Number(rawFormData.total),
                    fecha_pedido: fecha_pedido,
                    fecha_entrega: entregaDate,
                    hora_entrega: entregaDate,
                    telefono_cliente: rawFormData.telefono_cliente,
                    telefono_adicional_cliente: rawFormData.telefono_adicional_cliente,
                    observaciones: rawFormData.observaciones,
                    estado_pago: estado_pago,
                }
            });
            revalidatePath(`/dashboard/caja`);
            return { success: true, message: 'Pedido Creado Correctamente', data: data }
        } catch ( error : any ) {
        console.log('error', error);
        return { success: false, message: 'Pedido no pudo ser creado' }
        }
}

export async function deleteOrderTo( id : string ) {
    try {
        await prisma.pedidos.delete({
            where: {
                id: id.toString()
            }
        });
        revalidatePath(`/dashboard/caja/pedidos`);
        return { success: true, message: 'Pedido eliminado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Pedido no fue eliminado correctamente' }
    }
}

export async function updateOrderTo( formData : FormData, orderToId : any ) {
    
        const rawFormData = Object.fromEntries(formData.entries());
        const fecha_entrega = formData.get('fecha_entrega');
        const fecha_pedido = new Date().toISOString();
        let entregaDate = new Date(fecha_entrega as string);
        entregaDate = new Date(entregaDate.getTime() - entregaDate.getTimezoneOffset() * 60 * 1000);

        let estado_pago = 'pendiente';
        if (rawFormData.anticipo === rawFormData.total) {
            estado_pago = 'cancelado';
        }
        
        try {
            await prisma.pedidos.update({
                where: {
                    id: orderToId.toString()
                },
                data: {
                    nombre_cliente: rawFormData.nombre,
                    direccion_cliente: rawFormData.direccion_cliente,
                    anticipo: Number(rawFormData.anticipo),
                    total: Number(rawFormData.total),
                    fecha_pedido: fecha_pedido,
                    fecha_entrega: entregaDate,
                    hora_entrega: entregaDate,
                    telefono_cliente: rawFormData.telefono_cliente,
                    telefono_adicional_cliente: rawFormData.telefono_adicional_cliente,
                    observaciones: rawFormData.observaciones,
                    estado_pago: estado_pago,
                }
            });
            revalidatePath(`/dashboard/caja/pedidos`);
            return { success: true, message: 'Pedido actualizado correctamente' }
        } catch ( error : any ) {
        console.log('error', error);
        return { success: false, message: 'Pedido no fue actualizado correctamente' }
        }
}

export async function updateOrderToStatusAndUpdateOrdens( idOrderTo : any ) {
    try {
        await prisma.pedidos.update({
            where: {
                id: idOrderTo.toString()
            },
            data: {
                estado_pedido: 'entregado',
                estado_pago: 'cancelado'
            }
        });
        const findOrder = await prisma.ordens.findFirst({
            where: {
                pedido_id: idOrderTo.toString()
            }
        });
        await prisma.ordens.update({
            where: {
                id: findOrder.id.toString(),
                pedido_id: idOrderTo.toString()
            },
            data: {
                estado: 'finalizada'
            }
        });
        revalidatePath(`/dashboard/caja/pedidos`);
        return { success: true, message: 'Pedido actualizado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Pedido no fue actualizado correctamente' }
    }
}

export async function createNewCashFlow( formData: FormData ) {
    
        const rawFormData = Object.fromEntries(formData.entries());
        const actualDate = new Date().toISOString();
        let openDate = new Date(actualDate as string);
        openDate = new Date(openDate.getTime() - openDate.getTimezoneOffset() * 60 * 1000);
        const monto_C = Number(rawFormData.monto);
        const monto_U = parseFloat((monto_C / parseFloat(process.env.NEXT_PUBLIC_CONVERSION_RATE as string)).toFixed(2));

        const session = await getServerSession(authOptions);
        const client = session?.user?.name;

        const userFound = await prisma.users.findFirst({
            where: {
                name: client
            }
        });

        const cajaFound = await prisma.cajas.findFirst({
            where: {
                id: rawFormData.caja
            }
        });

        if (userFound.status === 'inactivo') return { success: false, message: 'Usuario Inactivo, nisiquiera deberias poder hacer esto.' }
    
        try {
            await prisma.flujo_cajas.create({
                data: {
                    fecha_apertura: openDate,
                    hora_apertura: openDate,
                    monto_inicial_C_: monto_C,
                    monto_inicial_U_: monto_U,
                    caja_id: rawFormData.caja,
                    user_id: userFound.id,
                    observaciones: 'Apertura de caja',
                    sobrante_caja: 0,
                }
            });

            await prisma.cajas.update({
                where: {
                    id: cajaFound.id.toString()
                },
                data: {
                    estado: 'abierto'
                }
            });

            revalidatePath(`/dashboard/caja`);
            revalidatePath(`/dashboard/caja/cierre`);
            return { success: true, message: 'Flujo de caja creado correctamente' }
        } catch ( error : any ) {
        console.log('error', error);
        return { success: false, message: 'Flujo de caja no fue creado correctamente' }
        }
}

export async function updateCashFlow( formData : FormData, diferencia : number, idCashFlow : any, absolutetotalinvoice : number ) {

    const observaciones = formData.get('feedback');
    const actualDate = new Date().toISOString();
    let closeDate = new Date(actualDate as string);
    closeDate = new Date(closeDate.getTime() - closeDate.getTimezoneOffset() * 60 * 1000);
    const monto_final_U_ = parseFloat((absolutetotalinvoice / parseFloat(process.env.NEXT_PUBLIC_CONVERSION_RATE as string)).toFixed(2));
    let faltante = 0;
    let sobrante = 0;
    if (diferencia < 0 ) {
        faltante = Math.abs(diferencia);
    } else {
        sobrante = diferencia;
    }

    try {
        await prisma.flujo_cajas.update({
            where: {
                id: idCashFlow.toString()
            },
            data: {
                fecha_cierre: closeDate,
                hora_cierre: closeDate,
                monto_final_C_: absolutetotalinvoice,
                monto_final_U_: monto_final_U_,
                sobrante_caja: sobrante,
                faltante_caja: faltante,
                observaciones: observaciones
            }
        });
        const findCashFlow = await prisma.flujo_cajas.findFirst({
            where: {
                id: idCashFlow.toString()
            }
        });
        await prisma.cajas.update({
            where: {
                id: findCashFlow.caja_id.toString()
            },
            data: {
                estado: 'cerrado'
            }
        });
        revalidatePath(`/dashboard/caja`);
        revalidatePath(`/dashboard/caja/cierre`);
        return { success: true, message: 'Flujo de caja actualizado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Flujo de caja no fue actualizado correctamente' }
    }
}

export async function createNewTable() {

    const findTable = await prisma.mesas.findFirst({
        orderBy: {
            nombre: 'desc'
        }
    });
    
    let numberTable = Number(findTable.nombre.split(' ')[1]);

    if (findTable) {
        numberTable = numberTable + 1;
    }


    try {
        const newTable = await prisma.mesas.create({
            data: {
                nombre: `Mesa ${numberTable}`,
                estado: 'libre'
            }
        })
        revalidatePath(`/dashboard/caja`);
        return { success: true, message: 'Mesa creada correctamente', data: newTable }
    } catch (error) {
        console.log('error', error);
        return { success: false, message: 'Mesa no fue creada correctamente' }
    }
}

export async function updateTable( idTable : string, stateTable : string ) {
    try {
        await prisma.mesas.update({
            where: {
                id: idTable
            },
            data: {
                estado: stateTable
            }
        });
        revalidatePath(`/dashboard/caja`);
        return { success: true, message: 'Mesa actualizada correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Mesa no fue actualizada correctamente' }
    }
}

export async function deleteTable( idTable : string ) {
    try {
        await prisma.mesas.delete({
            where: {
                id: idTable
            }
        });
        revalidatePath(`/dashboard/caja`);
        return { success: true, message: 'Mesa eliminada correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Mesa no fue eliminada correctamente' }
    }
}


export async function FetchSoldProductsToday() {

    const actualDate = new Date().toISOString();
    let date = new Date(actualDate as string);
    date = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    const fecha_emision = date.toISOString().split('T')[0] + 'T00:00:00.000Z';

    try {
        const invoices = await prisma.facturas.findMany({
            where: {
               fecha_emision: fecha_emision
            },
            include: {
               ordens: {
                 include: {
                   detalle_ordens: {
                    include: {
                    productos: true,
                    },
                   }
                 },
               },
            },
           });
           
    
     // Mapea las facturas para obtener solo los detalles de las órdenes
        const orderDetails: any = invoices.flatMap((invoice: any) =>
        invoice.ordens?.detalle_ordens || []
        );
       
        // Aplanamos la matriz para obtener solo los detalles de las órdenes
        const flattenOrderDetails = orderDetails.flat();
    
        // Mapeamos los detalles de las órdenes para obtener solo los productos
        const soldProducts = flattenOrderDetails.map((detail: any) => {
            return {
                cantidad: detail.cantidad,
                total: detail.monto_C_,
                price: Number(detail.productos.precio),
                producto: detail.productos.nombre,
            };
        });
        const groupedProducts = soldProducts.reduce((accumulator: any, currentProduct: any) => {
            const existingProduct = accumulator.find((product: any) => product.producto === currentProduct.producto);
            if (existingProduct) {
                existingProduct.cantidad += currentProduct.cantidad;
                existingProduct.total += currentProduct.total;
            } else {
                accumulator.push({...currentProduct});
            }
            return accumulator;
        }, []);
    
        return groupedProducts;
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchFilteredAllInvoice(query: string, startDate: any, endDate: any) {
    try {
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
                }
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
                }
            });
        }
        return Invoice;
    } catch (error: any) {
        throw new Error(error);
    }
}

export async function FetchFilteredAllCashFlow( startDate : string, endDate : string ) {
    try {
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
                }
            });
        } else {
            Invoice = await prisma.flujo_cajas.findMany({
                orderBy: {
                    id: 'desc',
                },
                include: {
                    users: true,
                    cajas: true,
                }
            });
        }
        return Invoice
    } catch (error : any) {
        throw new Error(error);
    }
}

export async function FetchTipOfDate(startDate : string, endDate : string) {    
    try {
        let totalPropinas = null
        if (startDate && endDate) {
            let Startdate = new Date(startDate as string);
            Startdate.setUTCHours(0, 0, 0, 0);
            const editStartDate = Startdate.toISOString();
        
            let Enddate = new Date(endDate as string);
            Enddate.setUTCHours(0, 0, 0, 0);
            const editEndDate = Enddate.toISOString();
            totalPropinas = await prisma.facturas.aggregate({
                _sum: {
                  propina_C_: true,
                },
                where: {
                  fecha_emision: {
                    gte: editStartDate,
                    lte: editEndDate,
                  },
                },
              });
        } else {
            totalPropinas = await prisma.facturas.aggregate({
                _sum: {
                  propina_C_: true,
                }
              });
        }
        return totalPropinas
    } catch ( error : any ) {
        throw new Error(error)
    }
}


export async function FetchDetailOrderByOrderId(id: string) {
    try {
        const order = await prisma.detalle_ordens.findMany({
            where: {
                orden_id: id,
                impreso: false
            }
        });
        await prisma.detalle_ordens.updateMany({
            where: {
              orden_id: id,
              impreso: false
            },
            data: {
              impreso: true
            }
        });
        return order;
    } catch (error: any) {
        throw new Error(error);
    }
}