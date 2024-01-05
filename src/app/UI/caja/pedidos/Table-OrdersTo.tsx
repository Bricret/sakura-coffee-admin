
import { FetchFilteredOrdersTo, FetchOrdersToPageCount } from "@/app/lib/data";
import { TableColumsOrdersTo } from "@/app/lib/data/Local-Data";
import Pagination from "../../inventario/Pagination";


export default async function TableOrderTo({ itemsForPage, query, currentPage } : { itemsForPage: number, query: string, currentPage: number }) {

    const OrdersTo = await FetchFilteredOrdersTo(query, itemsForPage, currentPage);
    const TotalPage = await FetchOrdersToPageCount(itemsForPage);

    console.log(OrdersTo, TotalPage);

    return (
    <>
     <table 
        className="min-w-full h-auto table-auto w-full"
        aria-label="Tabla de mesas"
        >
        <thead className=" bg-secundary">
            <tr className="h-10 rounded-full">
            {
                TableColumsOrdersTo.map((item) => (
                    <th 
                        key={item.key}
                        className="px-4 py-2 text-white font-bold first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default"
                    >
                        {item.label}
                    </th>
                ))
            }
            </tr>
        </thead>
        <tbody>
        {
            OrdersTo.map((item : any) => (
                <tr 
                    key={item.id}
                    className="h-10 hover:bg-gray-100 border-b border-gray-200 text-base font-medium text-gray-700 hover:text-gray-900 cursor-default"
                >
                    <td className=" flex flex-row gap-4 items-center justify-start px-4 py-4 text-black  first:rounded-l-2xl last:rounded-r-2xl text-start cursor-default">
                        <div className="w-8 h-8 hidden md:flex md:flex-wrap bg-third rounded-full"></div>
                        {item.nombre_cliente}
                    </td>   
                    <td className={`px-4 py-2 text-black  first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default`}>
                        <p className={`relative max-w-fit inline-flex items-center text-base box-border whitespace-nowrap px-2    rounded-full capitalize" ${ item.estado_pago === 'pendiente' ? "bg-[#f5a524] text-black" : "bg-[#d1f4e0] text-[#43d380]" }`}>
                            { item.estado_pago }
                        </p>
                    </td>
                    <td className={`px-4 py-2 text-black  first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default`}>
                    <p className={`relative max-w-fit inline-flex items-center text-base box-border whitespace-nowrap px-2    rounded-full capitalize" ${ item.estado_pedido === 'pendiente' ? "bg-[#f5a524] text-black" : "bg-[#d1f4e0] text-[#43d380]" }`}>
                            { item.estado_pedido }
                        </p>
                    </td>
                    <td className={`px-4 py-2 text-black  first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default`}>
                        { item.fecha_entrega.toLocaleDateString() }
                    </td>
                    <td className="px-4 py-2 text-black first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default">
                        <p>Actions</p>
                    </td>
                </tr>
            ))
        }
        </tbody>
    </table>
    <Pagination totalPages={TotalPage} />
    </>
    )
}