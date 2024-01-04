'use client';
import { updateOrder } from "@/app/lib/actions";
import { fonts } from "../../Fonts";
import { useRouter } from "next/navigation";


export default function UpdateOrder({ idOrder, total_C, total_U, idTable } : { idOrder : any, total_C : number, total_U : number, idTable : any  }) {
    const router = useRouter();


    async function HandleSubmit(e : any) {
        e.preventDefault();
        const res = await updateOrder( idOrder, total_C, total_U, idTable );
        router.push('/dashboard/caja');
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