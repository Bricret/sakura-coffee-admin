import { TableFlow } from "@/app/lib/data/Local-Data";
import InfoTable from "../inventario/Info-Table";
import Search from "../inventario/Search";
import ExcelBoton from "./ExcelBoton";
import Pagination from "../inventario/Pagination";
import { FetchFlowCashFiltered, FetchFlowCashPageCount } from "@/app/lib/data";
import ActionFlowCash from "./ActionFlowCash";


export default async function TableFlowCash({ dataParams } : { dataParams : any }) {

    const { itemsForPage, currentPage, startDate, endDate } = dataParams

    const FLowCash = await FetchFlowCashFiltered(itemsForPage, currentPage, startDate, endDate);
    const TotalPage = await FetchFlowCashPageCount(itemsForPage, startDate, endDate);

    return (
        <>
        <article className="flex flex-col gap-4 mb-4">
            <section className="flex justify-end gap-3 items-center md:items-end">
                <ExcelBoton query='' startDate={startDate} endDate={endDate} />
            </section>
            <InfoTable allProducts={ TotalPage.invoiceCount } type="Flujos de caja" location="reportes" invoice={false}/>   
        </article>
        <article className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small w-full">
            <table 
                className="min-w-full h-auto table-auto w-full"
                aria-label="Tabla de mesas"
                >
                <thead className="bg-secundary">
                    <tr className="h-10 rounded-full">
                        {
                            TableFlow.map((item) => (
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
                    FLowCash.map((item : any) => {
                    return (
                        
                        <tr 
                            key={item.id}
                            className="h-10 hover:bg-gray-100 border-b border-gray-200 text-base font-medium text-gray-700 hover:text-gray-900 cursor-default"
                        >
                            <td className="px-4 py-4 text-black last:rounded-r-2xl text-start cursor-default">
                                {item.id.toString()}
                            </td>
                            <td className={`px-4 py-2 text-black  first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default`}>
                                {item.monto_inicial_C_}
                            </td>
                            <td className={`px-4 py-2 text-black  first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default`}>
                                {item.monto_final_C_}
                            </td>
                            <td className={`px-4 py-2 text-red-500 font-semibold  first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default`}>
                                {item.faltante_caja}
                            </td>
                            <td className={`px-4 py-2 text-green-500 font-semibold  first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default`}>
                                {item.sobrante_caja}
                            </td>
                            <td className={`px-4 py-2 text-black  first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default`}>
                                {item.users.name}
                            </td>
                            <td className={`px-4 py-2 text-black  first:rounded-l-2xl text-center cursor-default`}>
                                <ActionFlowCash />
                            </td>
                        </tr>
                    )})
                }
                 </tbody>
            </table>
            
            <Pagination totalPages={TotalPage.pageCount} Path="pageFlow" />
        </article>
    </>
    )
}