import { FetchDetailOrderByTable } from "@/app/lib/data";
import { TableColumsDetailsOrders } from "@/app/lib/data/Local-Data";
import ActionOrder from "./Action-Oder";


export default async function TableDetailOrder({ idOrder, product }: { idOrder?: string, product : any } ) {

    const detailOrder = await FetchDetailOrderByTable(idOrder);

    return (
        <table 
        className="min-w-full h-auto table-auto w-full"
        aria-label="Tabla de mesas"
        >
        <thead className=" bg-secundary">
            <tr className="h-10 rounded-full">
                {
                    TableColumsDetailsOrders.map((item) => (
                        <th 
                            key={item.key}
                            className="px-4 py-2 text-white font-bold text-sm first:rounded-l-xl last:rounded-r-xl text-center cursor-default"
                        >
                            {item.label}
                        </th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
        {/* verificara si existe un producto para dar un mensaje a dependencia de la respuesta */}
        {
            detailOrder.map((item : any) => (
                <tr 
                    key={item.id}
                    className="h-10 hover:bg-gray-100 border-b border-gray-200 py-4"
                >
                    <td className="px-4 py-2 text-sm text-start">{
                        product.map((produ : any) => (
                            produ.id === item.producto_id ? produ.nombre : null
                        ))
                    }</td>
                    <td className="px-4 py-2 text-sm text-center">{item.cantidad}</td>
                    <td className="px-4 py-2 text-sm text-center">{item.monto_C_}</td>
                    <td className="px-4 py-2 text-sm text-center">{item.monto_U_}</td>
                    <td className="px-4 py-2 text-sm text-center"><ActionOrder /></td>
                </tr>
            ))
        }
        </tbody>
    </table>
    )
}