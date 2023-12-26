import { FetchTables } from "@/app/lib/data";
import { TableColumsCash } from "@/app/lib/data/Local-Data";


export default async function TableCash() {

    const tables = await FetchTables();

    return (
        <table 
            className="min-w-full h-auto table-auto w-full"
            aria-label="Tabla de mesas"
            >
            <thead className=" bg-secundary">
                <tr className="h-10 rounded-full">
                    {
                        TableColumsCash.map((item) => (
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
                tables.map((item : any) => (
                    <tr 
                        key={item.id}
                        className="h-10 hover:bg-gray-100 border-b border-gray-200 text-sm font-medium text-gray-700 hover:text-gray-900 cursor-default"
                    >
                        <td className="px-4 py-4 text-black  first:rounded-l-2xl last:rounded-r-2xl text-start cursor-default">
                            {item.nombre}
                        </td>
                        <td className={`px-4 py-2 text-black  first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default`}>
                            <p className={`relative max-w-fit inline-flex items-center text-sm box-border whitespace-nowrap px-2    rounded-full capitalize" ${ item.estado === 'libre' ? "bg-[#d1f4e0] text-[#43d380]" : "bg-[#fdd0df] text-[#f31260]" }`}>
                                { item.estado }
                            </p>
                        </td>
                        <td className="px-4 py-2 text-black first:rounded-l-2xl last:rounded-r-2xl text-center cursor-default">
                            a
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}