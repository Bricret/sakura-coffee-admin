'use client';

import HandleParams from "@/app/lib/HandleParams";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import GetQuerysDate from "../GetQuerysDate";

export default function InfoTable({ allProducts, type, location, invoice = true } : { allProducts: any, type: string, location?: string, invoice? : boolean}) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const paramsName = 'dataForPage';

    const handleParams = (term: any, ) => {
        HandleParams({term, searchParams, paramsName, pathname, replace});
    }

    return (
        <nav className="flex justify-between items-center">
            <p className="text-default-400 text-small cursor-default">Total de { type }: { allProducts }</p>
            <article className="hidden md:flex gap-x-2 ">
                {
                    location === 'reportes' && (
                        <GetQuerysDate invoice={invoice} />
                    )
                }
            </article>
                <label className="flex items-center text-default-400 text-small" htmlFor={type}>
                    Datos por pagina:
                    <select
                        className="bg-transparent outline-none text-default-400 text-small"
                        id={type}
                        name={type}
                        onChange={ (e) => handleParams(e.target.value) }
                        defaultValue={ searchParams.get('dataForPage')?.toString() || 5 }
                    >
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </select>
                </label>
        </nav>
    )
}