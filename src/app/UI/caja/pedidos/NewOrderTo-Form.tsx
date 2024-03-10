'use client';

import { createNewOrderTo, createNewOrdersByOrderTo, updateOrderTo } from "@/app/lib/actions";
import { Button } from "../../auth/button"
import { useRouter } from "next/navigation";
import { Toaster } from "sonner";
import { ErrorToast } from "@/app/plugins/sonner";

const label = "font-bold text-lg mb-2"

export default function NewOrderToForm({ OrderTo, type } : { OrderTo?: any, type : string }) {
    const router = useRouter();

    const ActionOrderTo = async ( formData : FormData ) => {
        const anticipo = formData.get('anticipo');
        const total = formData.get('total');
        if (Number(anticipo) > Number(total)) {
            return ErrorToast('El anticipo no puede ser mayor al total');
        }
        if (type === 'new') {
            const res = await createNewOrderTo(formData);
            if(res.success === true) {
                await createNewOrdersByOrderTo(res.data.id, total);
                router.push(`/dashboard/caja/pedidos`);
            } else {
                ErrorToast(res.message);
            }
        } else if (type === 'edit') {
            const res = await updateOrderTo(formData, OrderTo.id);
            if(res.success === true) {
                router.push(`/dashboard/caja/pedidos`);
            } else {
                ErrorToast(res.message);
            }

        }

    }

    let fechaEntregaFormatoLocal = '';
    if(OrderTo?.fecha_entrega) {
        const fechaEntrega = new Date(OrderTo.fecha_entrega).toISOString();
        fechaEntregaFormatoLocal = fechaEntrega.substring(0, fechaEntrega.length - 8);
    }
    
    return (
    <>
    <form className="flex flex-col md:flex-row md:flex-wrap gap-6 pl-4" action={ActionOrderTo}>
        <div className="flex flex-col w-full md:w-2/5">
            <label htmlFor="nombre" className={ label }>Nombre del cliente</label>
            <input 
                className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
                placeholder="Nombre y Apellido"
                name="nombre"
                type="text"
                required
                defaultValue={ OrderTo?.nombre_cliente || ''}
                id="nombre"
            />
        </div>
        <div className="flex flex-col w-full md:w-2/4">
        <label htmlFor="fecha_entrega" className={ label }>Fecha de Entrega</label>   
        <input 
            className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
            name="fecha_entrega"
            type="datetime-local"
            id="fecha_entrega"
            required
            defaultValue={ fechaEntregaFormatoLocal || '' }
        />
        </div>
        <div className="flex flex-col w-full md:w-2/5">
            <label htmlFor="telefono_cliente" className={ label }>Numero Telefonico</label>
            <input 
                name="telefono_cliente" 
                id="telefono_cliente"
                type="number"
                placeholder="78695496"
                defaultValue={ OrderTo?.telefono_cliente || ''}
                required
                className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
            />
        </div>
        <div className="flex flex-col w-full md:w-2/4">
            <label htmlFor="total" className={ label }>Total</label>
            <input 
                name="total" 
                id="total"
                type="number"
                placeholder="100"
                min="0"
                step="0.1"
                defaultValue={ OrderTo?.total || ''}
                required
                className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
            />
        </div>
        <div className="flex flex-col w-full md:w-2/5">
            <label htmlFor="anticipo" className={ label }>Anticipo</label>
            <input 
                name="anticipo" 
                id="anticipo"
                type="number"
                placeholder="100"
                min="0"
                step="0.1"
                defaultValue={ OrderTo?.anticipo || ''}
                required
                className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
            />
        </div>
        <div className="flex flex-col w-full md:w-2/4">
            <label htmlFor="observaciones" className={label}>Observaciones</label>
            <textarea 
                name="observaciones" 
                id="observaciones"
                placeholder="Detalles relevantes del pedido"
                required
                maxLength={ 400 }
                defaultValue={OrderTo?.observaciones || ''}
                className="resize-y max-h-80 border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
            />
        </div>
        <div className="flex flex-col md:w-48 mt-4">
            <Button>
                { type === 'new' ? 'Crear Pedido' : 'Editar Pedido' }
            </Button>
        </div>
            <Toaster 
            dir="auto"
            visibleToasts={2}
            duration={1500}
            closeButton
            richColors
        />
    </form>
    </>
    )
}