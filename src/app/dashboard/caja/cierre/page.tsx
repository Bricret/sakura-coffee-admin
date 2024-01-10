import ActiveCajaForm from "@/app/UI/caja/cierre/ActiveCaja-Form";
import { FetchCaja } from "@/app/lib/data";



export default async function CierrePage() {

    const caja = await FetchCaja();
    const cajaActiva = caja.filter((item : any) => item.estado === "abierto");

    return (
        <div className="flex flex-col gap-4">
            {cajaActiva.length === 0 ? (
                <>
                <div className="flex items-center justify-end w-full md:w-1/3">
                    <ActiveCajaForm caja={caja}/>
                </div>
                <div className="flex items-center justify-center my-auto mx-auto h-60 md:h-96">
                    <h1 className="text-3xl md:text-5xl text-zinc-600/40 cursor-default">Active una caja</h1>
                </div>
            </>
            ) : (
                <div className="flex flex-col gap-4">
                    <h1 className="text-2xl font-semibold">Caja Activa</h1>
                    <div className="flex flex-col gap-4">
                        <h2 className="text-xl font-semibold">Caja N° {cajaActiva[0].numero_caja}</h2>
                        {/* <h2 className="text-xl font-semibold">Monto Inicial: C$ {CashFlow[0].monto_inicial_C_}</h2>
                        <h2 className="text-xl font-semibold">Fecha de Apertura: { new Date (CashFlow[0].fecha_apertura).toLocaleString() }</h2> */}
                    </div>
                </div>
            )}
        </div>
    )
}