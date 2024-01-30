import { TableFlow } from "@/app/lib/data/Local-Data";
import InfoTable from "../inventario/Info-Table";
import Search from "../inventario/Search";
import ExcelBoton from "./ExcelBoton";
import Pagination from "../inventario/Pagination";


export default function TableFlowCash({ dataParams } : { dataParams : any }) {

    const { query, itemsForPage, currentPage, startDate, endDate } = dataParams

// Todo: Terminar de implementar este componente con nueva query y fechas para este unico componente y cambiar la fecha que se muestra en el excel pq esta aerronea

    return (
        <>
        <article className="flex flex-col gap-4 mb-4">
            <section className="flex justify-between gap-3 items-center md:items-end">
                <Search placeholder="Busca por ID de Factura..." type="number" />
                <ExcelBoton query={query} startDate={startDate} endDate={endDate} />
            </section>
            {/* <InfoTable allProducts={ TotalPage.invoiceCount } type="Flujos de caja" location="reportes"/> */}   
        </article>
        <article className="p-4 z-0 flex flex-col relative justify-between gap-4 bg-content1 overflow-auto rounded-large shadow-small w-full">
            <table 
                className="min-w-full h-auto table-auto w-full"
                aria-label="Tabla de mesas"
                >
                <thead className=" bg-secundary">
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
                {/* {
                    invoices.map((item : any) => {
                        let fechaEntregaFormatoLocal = '';
                    if(item.fecha_emision) {
                        const fechaEntrega = new Date(item.fecha_emision).toISOString();
                        fechaEntregaFormatoLocal = fechaEntrega.substring(0, fechaEntrega.length - 8);
                    }
                    return (
                        
                        <tr 
                            key={item.id}
                            className="h-10 hover:bg-gray-100 border-b border-gray-200 text-base font-medium text-gray-700 hover:text-gray-900 cursor-default"
                        >
                            <td className="px-4 py-4 text-black last:rounded-r-2xl text-start cursor-default">
                                {item.numero_factura.toString()}
                            </td>
                            <td className={`px-4 py-2 text-black  first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default`}>
                                {item.metodo_pago}
                            </td>
                            <td className={`px-4 py-2 text-black  first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default`}>
                                {item.total_C_}
                            </td>
                            <td className={`px-4 py-2 text-black  first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default`}>
                                {item.propina_C_}
                            </td>
                            <td className={`px-4 py-2 text-black  first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default`}>
                                {fechaEntregaFormatoLocal.split('T')[0]}
                            </td>
                            <td className={`px-4 py-2 text-black  first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default`}>
                                {item.users.name}
                            </td>
                            <td className={`px-4 py-2 text-black  first:rounded-l-2xl text-center cursor-default`}>
                                <ActionInvoice Invoice={item} />
                            </td>
                        </tr>
                    )})
                } */}
                </tbody>
                
            </table>
            
            {/* <Pagination totalPages={TotalPage.pageCount} /> */}
        </article>
    </>
    )
}