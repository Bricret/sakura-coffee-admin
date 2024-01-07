'use client';

import { createNewOrderTo } from "@/app/lib/actions";
import { Button } from "../../auth/button"
import { useRouter } from "next/navigation";

const label = "font-bold text-lg mb-2"

export default function NewOrderToForm({ ProductData } : { ProductData?: any }) {
    const router = useRouter();

    const ActionOrderTo = async ( formData : FormData ) => {
        const anticipo = formData.get('anticipo');
        const total = formData.get('total');
        const res = await createNewOrderTo(formData);
        if(res.success === true) {
            router.push(`/dashboard/caja/pedidos`);
        } else {
            alert("Error al crear el pedido");
        }
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
                defaultValue={ ProductData?.nombre || ''}
                id="nombre"
            />
        </div>
        <div className="flex flex-col w-full md:w-2/5">
            <label htmlFor="direccion_cliente" className={ label }>Direccion del cliente</label>   
            <input 
                className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
                placeholder="Calle 1 # 2-3"
                name="direccion_cliente"
                type="text"
                required
                defaultValue={ ProductData?.direccion_cliente || ''}
                id="direccion_cliente"
            />
        </div>
        <div className="flex flex-col w-full md:w-2/5">
        <label htmlFor="fecha_entrega" className={ label }>Fecha de Entrega</label>   
        <input 
            className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
            name="fecha_entrega"
            type="datetime-local"
            placeholder="100"
            id="fecha_entrega"
            defaultValue={ ProductData?.fecha_entrega || ''}
            required
        />
        </div>
        <div className="flex flex-col w-full md:w-2/5">
            <label htmlFor="telefono_cliente" className={ label }>Numero Telefonico</label>
            <input 
                name="telefono_cliente" 
                id="telefono_cliente"
                type="number"
                placeholder="78695496"
                defaultValue={ ProductData?.telefono_cliente || ''}
                required
                className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
            />
        </div>
        <div className="flex flex-col w-full md:w-2/5 ">
            <label htmlFor="telefono_adicional_cliente" className={ label }>Telefono adicional</label>
            <input
                name="telefono_adicional_cliente" 
                id="telefono_adicional_cliente"
                type="number"
                placeholder="786952932"
                required
                defaultValue={ ProductData?.telefono_adicional_cliente || ''}
                className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
            />
        </div>
        <div className="flex flex-col w-full md:w-2/5">
            <label htmlFor="total" className={ label }>Total</label>
            <input 
                name="total" 
                id="total"
                type="number"
                placeholder="100"
                min="0"
                step="0.1"
                defaultValue={ ProductData?.total || ''}
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
                defaultValue={ ProductData?.anticipo || ''}
                required
                className="border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
            />
        </div>
        <div className="flex flex-col w-full md:w-2/5">
            <label htmlFor="observaciones" className={label}>Observaciones</label>
            <textarea 
                name="observaciones" 
                id="observaciones"
                placeholder="Detalles relevantes del pedido"
                required
                defaultValue={ProductData?.observaciones || ''}
                className="resize-y max-h-80 border-2 border-secundary/70 bg-inherit p-3 rounded-xl" 
            />
        </div>
        <div className="flex flex-col md:w-48 mt-4">
            <Button>Guardar</Button>
        </div>
            {/* <Toaster 
            dir="auto"
            visibleToasts={2}
            duration={1500}
            closeButton
            richColors
        /> */}
    </form>
    </>
    )
}