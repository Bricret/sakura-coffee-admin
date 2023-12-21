'use client';

import HandleParams from "@/app/lib/HandleParams";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function InfoTable({ allProducts } : { allProducts: any }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const paramsName = 'dataForPage';

    const handleParams = (term: any, ) => {
        HandleParams({term, searchParams, paramsName, pathname, replace});
    }

    return (
        <div className="flex justify-between items-center">
            <span className="text-default-400 text-small cursor-default">Total de productos: { allProducts.length }</span>
            <label className="flex items-center text-default-400 text-small" htmlFor="cars">
            Datos por pagina:
            <select
                className="bg-transparent outline-none text-default-400 text-small"
                id="cars"
                name="cars"
                onChange={ (e) => handleParams(e.target.value) }
                defaultValue={ searchParams.get('dataForPage')?.toString() || 5 }
            >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
            </select>
            </label>
        </div>
    )
}