'use client';
import { updateOrder, updateOrderByTable } from "@/app/lib/actions";
import { fonts } from "../../Fonts";
import { useRouter } from "next/navigation";


export default function UpdateOrder({ idOrder, total_C, total_U, idTable, ubi } : { idOrder : any, total_C : number, total_U : number, idTable? : any, ubi?: any }) {
    const router = useRouter();

    async function HandleSubmit(e : any) {
        e.preventDefault();
        if (ubi === 2) {
            const res = await updateOrderByTable( idOrder, total_C, total_U, idTable );
            const { data } = res;
            const orderIdAndTableId = `${data.id.toString()}-${idTable.toString()}`
            const url = `http://localhost:3000/print/printComanda/${orderIdAndTableId}`;
            window.open(url, '_blank');
            router.push('/dashboard/caja');
        } 
        if (ubi === 1) {
            const res = await updateOrder( idOrder, total_C, total_U );
        }
    }

    return (
    <div className="flex items-end justify-end">
        <button 
            className={`rounded-md text-center h-10 px-4 py-2 bg-third text-white font-bold hover:bg-secundary transition duration-300 ease-in-out ${fonts.merriweather.className}`}
            type="submit"
            onClick={ (e) => HandleSubmit(e) }
        >
            Finalizar
        </button>
    </div>
    )
}