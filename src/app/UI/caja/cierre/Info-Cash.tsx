
export default function InfoCash({ cajaActiva, Cashflow, fechaEntregaFormatoLocal } : { cajaActiva: any, Cashflow: any, fechaEntregaFormatoLocal: any}) {
    return (
        <div className="flex flex-row items-end justify-between gap-4">
            <h1 className="text-3xl text-green-500 font-semibold w-1/3">Caja Activa</h1>
            <div className="flex flex-row items-center justify-between gap-4 w-full">
                <h2 className="text-xl font-semibold">Caja N°:
                    <span className="font-normal"> { cajaActiva[0].numero_caja }</span>
                </h2>
                <h2 className="text-xl font-semibold">Monto Inicial:  
                    <span className="font-normal"> C$ { Cashflow.monto_inicial_C_ }</span>
                </h2>
                <h2 className="text-xl font-semibold">Fecha de Apertura: 
                    <span className="font-normal"> { fechaEntregaFormatoLocal.split('T')[0] }</span>
                </h2>
            </div>
        </div>
    )
}