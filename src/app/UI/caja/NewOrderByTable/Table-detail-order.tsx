import { FetchDetailOrderByTable } from "@/app/lib/data";
import { TableColumsDetailsOrders } from "@/app/lib/data/Local-Data";
import ActionOrder from "./Action-Oder";


export default async function TableDetailOrder({ idOrder, product, idTable }: { idOrder?: string, product : any, idTable : any } ) {

    const detailOrder = await FetchDetailOrderByTable(idOrder);
    const Total_C = detailOrder.reduce((acc : any, item : any) => acc + item.monto_C_, 0);
    const Total_U = detailOrder.reduce((acc : any, item : any) => acc + item.monto_U_, 0);

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
                            className="px-4 py-2 text-white font-bold text-sm md:text-base first:rounded-l-xl last:rounded-r-xl text-center cursor-default"
                        >
                            {item.label}
                        </th>
                    ))
                }
            </tr>
        </thead>
        <tbody>
        {
            detailOrder.map((item : any) => (
                <tr 
                    key={item.id}
                    className="h-10 hover:bg-gray-100 border-b border-gray-200 py-4"
                >
                    <td className="px-4 py-2 text-sm md:text-base text-start">{
                        product.map((produ : any) => (
                            produ.id === item.producto_id ? produ.nombre : null
                        ))
                    }</td>
                    <td className="px-4 py-2 text-sm md:text-base text-center">{item.cantidad}</td>
                    <td className="px-4 py-2 text-sm md:text-base text-center">{item.monto_C_}</td>
                    <td className="px-4 py-2 text-sm md:text-base text-center">{item.monto_U_}</td>
                    <td className="px-4 py-2 text-sm md:text-base text-center">
                        <ActionOrder id={ item.id } orderId={idOrder} idTable={ idTable } product={ product } detailOrder={item}/>
                    </td>
                </tr>
            ))
        }
        <tr className="border-t-2 border-t-black font-bold">
            <td className="px-4 py-2 text-base text-start">Total</td>
            <td className="px-4 py-2 text-base text-center">{ detailOrder.reduce((acc : any, item : any) => acc + item.cantidad, 0) }</td>
            <td className="px-4 py-2 text-base text-center">C$ { Total_C.toFixed(2) }</td>
            <td className="px-4 py-2 text-base text-center">U$ { Total_U.toFixed(2) }</td>
            <td className="px-4 py-2 text-base text-center"></td>
        </tr>
        </tbody>
    </table>
    )
}