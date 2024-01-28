import { ExcelIcon } from "@/app/plugins/Icons";


export default function ExcelBoton() {

    return (
        <button className="bg-green-900 hover:bg-green-800 hover:scale-110 transition text-white py-4 md:py-3 gap-x-2 px-4 rounded-xl flex justify-between items-center">
            <ExcelIcon className='size-10' />
            <span className="hidden md:block">Exportar a Excel</span>
        </button>
    )
}