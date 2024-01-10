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
        const total_U_ = parseFloat((total / 36.6243).toFixed(2));

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
        return { success: true, message: 'Orden actualizada correctamente' }
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
        return { success: true, message: 'Orden actualizada correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Orden no fue actualizada correctamente', data: error }
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
    const monto_U_ = parseFloat((monto_C_ / 36.6243).toFixed(2));

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
        const monto_U_ = parseFloat((monto_C_ / 36.6243).toFixed(2));
    
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
    const monto_U_ = parseFloat((monto_C_ / 36.6243).toFixed(2));

    try {
        await prisma.detalle_ordens.update({
            where: {
                id: id
            },
            data: {
                cantidad: Number(cantidad),
                monto_C_: monto_C_,
                monto_U_: monto_U_
            }
        });
        revalidatePath(`/dashboard/caja/newOrder/${idTable}`);
        return { success: true, message: 'Producto actualizado correctamente' }
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Producto no fue actualizado correctamente' }
    }
    
}

export async function updateOderTable( formData : FormData, infoOder : any ) {
    const table = formData.get('table');
    const {id, mesa_id} = infoOder;
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
    const ActualDate = new Date().toISOString();
    const ActualTime = new Date().toISOString();
    const propina_C =parseFloat((Order.sub_total_C_ * 0.10).toFixed(2));
    const propina_U = parseFloat((propina_C / 36.6243).toFixed(2));
    const total_C = Order.sub_total_C_ + propina_C;
    const total_U = Order.sub_total_U_ + propina_U;

    // Busca el usuario que esta logueado 
    const userFound = await prisma.users.findFirst({
        where: {
            name: client
        }
    });

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
                fecha_emision: ActualDate,
                hora_emision: ActualTime,
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
        if (newInvoice) {
            try {
                await prisma.ordens.update({
                    where: {
                        id: Order.id
                    },
                    data: {
                        estado: 'finalizada'
                    }
                });
                await prisma.mesas.update({
                    where: {
                        id: Order.mesa_id
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
        return { success: true, message: 'Factura creada correctamente', data: newInvoice}
    } catch ( error : any ) {
       console.log('error', error);
       return { success: false, message: 'Error al intentar crear la factura' }
    }
}

export async function createNewInvoice( Order : any, TypePay : any ) {
    
    const session = await getServerSession(authOptions);
    const client = session?.user?.name;
    const ActualDate = new Date().toISOString();
    const ActualTime = new Date().toISOString();
    const propina_C =parseFloat((Order.sub_total_C_ * 0.10).toFixed(2));
    const propina_U = parseFloat((propina_C / 36.6243).toFixed(2));
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
                fecha_emision: ActualDate,
                hora_emision: ActualTime,
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
        if (newInvoice) {
            try {
                await prisma.ordens.update({
                    where: {
                        id: Order.id
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
        return { success: true, message: 'Factura creada correctamente', data: newInvoice}
    } catch ( error : any ) {
    console.log('error', error);
    return { success: false, message: 'Error al intentar crear la factura' }
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