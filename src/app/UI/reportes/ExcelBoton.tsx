import { ExcelIcon } from "@/app/plugins/Icons";


export default function ExcelBoton() {

    return (
        <button className="bg-green-900 text-white py-4 md:py-3 gap-x-2 px-4 rounded-xl flex justify-between">
            <ExcelIcon className='size-10' />
            <span className="hidden md:block">Exportar a Excel</span>
        </button>
    )
}